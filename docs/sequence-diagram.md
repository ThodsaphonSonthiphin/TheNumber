# Sequence Diagrams — Member System

## 1. Register Flow (ASP.NET Identity)

```mermaid
sequenceDiagram
    actor User
    participant React as React App
    participant API as ASP.NET Core API
    participant Identity as ASP.NET Identity
    participant DB as SQL Server

    User->>React: กรอก Email, Password, ชื่อ
    React->>API: POST /api/auth/register<br/>{ email, password, displayName }
    API->>Identity: UserManager.CreateAsync(user, password)
    Identity->>DB: INSERT AspNetUsers
    DB->>Identity: OK
    Identity->>API: IdentityResult.Succeeded
    API->>API: Generate JWT Token
    API->>React: 200 OK — { token, email, displayName, expiresAt }
    React->>React: เก็บ Token ใน memory/localStorage
    React->>User: เข้าสู่ระบบสำเร็จ
```

## 2. Login Flow

```mermaid
sequenceDiagram
    actor User
    participant React as React App
    participant API as ASP.NET Core API
    participant Identity as ASP.NET Identity
    participant DB as SQL Server

    User->>React: กรอก Email + Password
    React->>API: POST /api/auth/login<br/>{ email, password }
    API->>Identity: UserManager.FindByEmailAsync(email)
    Identity->>DB: SELECT FROM AspNetUsers
    DB->>Identity: User record
    API->>Identity: SignInManager.CheckPasswordSignInAsync()
    Identity->>API: SignInResult.Succeeded
    API->>API: Generate JWT Token
    API->>React: 200 OK — { token, email, displayName, expiresAt }
    React->>React: เก็บ Token ใน memory/localStorage
    React->>User: เข้าสู่ระบบสำเร็จ
```

## 3. Create Family Flow

```mermaid
sequenceDiagram
    actor User
    participant React as React App
    participant API as ASP.NET Core API
    participant DB as SQL Server

    User->>React: กรอกชื่อ Family + เลือก emoji
    React->>API: POST /api/families<br/>Authorization: Bearer {token}<br/>{ name, avatarEmoji }
    API->>API: Extract UserId จาก JWT (ClaimTypes.NameIdentifier)
    API->>DB: INSERT Family (name, emoji, userId)
    DB->>API: Family record created
    API->>React: 201 Created — FamilyResponse
    React->>React: dispatch(addFamily)
    React->>User: แสดง Family card ใหม่
```

## 4. Add Member to Family Flow

```mermaid
sequenceDiagram
    actor User
    participant React as React App
    participant API as ASP.NET Core API
    participant DB as SQL Server

    User->>React: กดปุ่ม "เพิ่มสมาชิก"
    React->>User: แสดง Form (ชื่อ, role, วันเกิด, emoji)
    User->>React: กรอกข้อมูลสมาชิก + กด Submit
    React->>API: POST /api/families/{familyId}/members<br/>Authorization: Bearer {token}<br/>{ displayName, role, dateOfBirth, avatarEmoji }
    API->>API: ตรวจสอบ Family ownership (userId from JWT)
    API->>DB: INSERT Member
    DB->>API: Member record created
    API->>React: 201 Created — MemberResponse
    React->>React: dispatch(addMember)
    React->>User: แสดง Member card ใหม่ในรายชื่อ
```

## 5. View Family Members Flow

```mermaid
sequenceDiagram
    actor User
    participant React as React App
    participant API as ASP.NET Core API
    participant DB as SQL Server

    User->>React: กดเลือก Family card
    React->>API: GET /api/families/{familyId}<br/>Authorization: Bearer {token}
    API->>API: ตรวจสอบ ownership (userId from JWT)
    API->>DB: SELECT Family JOIN Members
    DB->>API: Family with Members[]
    API->>React: 200 OK — FamilyResponse (with members)
    React->>React: dispatch(setCurrentFamily)
    React->>User: แสดงรายชื่อสมาชิกทั้งหมดใน Family
```

## 6. Delete Member Flow

```mermaid
sequenceDiagram
    actor User
    participant React as React App
    participant API as ASP.NET Core API
    participant DB as SQL Server

    User->>React: กดปุ่ม "ลบ" บน Member card
    React->>User: แสดง Confirm dialog
    User->>React: กด "ยืนยัน"
    React->>API: DELETE /api/families/{familyId}/members/{id}<br/>Authorization: Bearer {token}
    API->>API: ตรวจสอบ ownership
    API->>DB: DELETE Member
    DB->>API: OK
    API->>React: 204 No Content
    React->>React: dispatch(removeMember)
    React->>User: อัพเดท UI — member หายไป
```
