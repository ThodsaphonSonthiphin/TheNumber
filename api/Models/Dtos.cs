namespace TheNumber.Api.Models;

// ── Auth DTOs ──

public record RegisterRequest(string Email, string Password, string? DisplayName);

public record LoginRequest(string Email, string Password);

public record AuthResponse(string Token, string Email, string? DisplayName, DateTime ExpiresAt);

// ── Family DTOs ──

public record CreateFamilyRequest(string Name, string? AvatarEmoji);

public record UpdateFamilyRequest(string Name, string? AvatarEmoji);

public record FamilyResponse(
    Guid Id,
    string Name,
    string? AvatarEmoji,
    DateTime CreatedAt,
    int MemberCount,
    List<MemberResponse> Members
);

// ── Member DTOs ──

public record CreateMemberRequest(
    string DisplayName,
    string? AvatarEmoji,
    string Role,
    DateTime DateOfBirth
);

public record UpdateMemberRequest(
    string DisplayName,
    string? AvatarEmoji,
    string Role,
    DateTime DateOfBirth
);

public record MemberResponse(
    Guid Id,
    string DisplayName,
    string? AvatarEmoji,
    string Role,
    DateTime DateOfBirth,
    DateTime CreatedAt,
    Guid FamilyId
);
