using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TheNumber.Api.Data;
using TheNumber.Api.Models;

namespace TheNumber.Api.Controllers;

[ApiController]
[Route("api/families/{familyId:guid}/[controller]")]
[Authorize]
public class MembersController : ControllerBase
{
    private readonly AppDbContext _db;

    public MembersController(AppDbContext db)
    {
        _db = db;
    }

    private string GetUserId() =>
        User.FindFirstValue(ClaimTypes.NameIdentifier)
        ?? throw new UnauthorizedAccessException("Missing user ID from token");

    private async Task<Family?> GetOwnedFamily(Guid familyId)
    {
        var userId = GetUserId();
        return await _db.Families
            .FirstOrDefaultAsync(f => f.Id == familyId && f.UserId == userId);
    }

    [HttpGet]
    public async Task<ActionResult<List<MemberResponse>>> GetMembers(Guid familyId)
    {
        var family = await GetOwnedFamily(familyId);
        if (family is null) return NotFound();

        var members = await _db.Members
            .Where(m => m.FamilyId == familyId)
            .OrderBy(m => m.CreatedAt)
            .Select(m => new MemberResponse(
                m.Id, m.DisplayName, m.AvatarEmoji, m.Role,
                m.DateOfBirth, m.CreatedAt, m.FamilyId
            ))
            .ToListAsync();

        return Ok(members);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<MemberResponse>> GetMember(Guid familyId, Guid id)
    {
        var family = await GetOwnedFamily(familyId);
        if (family is null) return NotFound();

        var member = await _db.Members
            .FirstOrDefaultAsync(m => m.Id == id && m.FamilyId == familyId);

        if (member is null) return NotFound();

        return Ok(new MemberResponse(
            member.Id, member.DisplayName, member.AvatarEmoji, member.Role,
            member.DateOfBirth, member.CreatedAt, member.FamilyId
        ));
    }

    [HttpPost]
    public async Task<ActionResult<MemberResponse>> CreateMember(Guid familyId, CreateMemberRequest request)
    {
        var family = await GetOwnedFamily(familyId);
        if (family is null) return NotFound();

        var member = new Member
        {
            DisplayName = request.DisplayName,
            AvatarEmoji = request.AvatarEmoji ?? "🧒",
            Role = request.Role,
            DateOfBirth = request.DateOfBirth,
            FamilyId = familyId,
        };

        _db.Members.Add(member);
        await _db.SaveChangesAsync();

        var response = new MemberResponse(
            member.Id, member.DisplayName, member.AvatarEmoji, member.Role,
            member.DateOfBirth, member.CreatedAt, member.FamilyId
        );

        return CreatedAtAction(nameof(GetMember), new { familyId, id = member.Id }, response);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<MemberResponse>> UpdateMember(Guid familyId, Guid id, UpdateMemberRequest request)
    {
        var family = await GetOwnedFamily(familyId);
        if (family is null) return NotFound();

        var member = await _db.Members
            .FirstOrDefaultAsync(m => m.Id == id && m.FamilyId == familyId);

        if (member is null) return NotFound();

        member.DisplayName = request.DisplayName;
        member.AvatarEmoji = request.AvatarEmoji;
        member.Role = request.Role;
        member.DateOfBirth = request.DateOfBirth;
        await _db.SaveChangesAsync();

        return Ok(new MemberResponse(
            member.Id, member.DisplayName, member.AvatarEmoji, member.Role,
            member.DateOfBirth, member.CreatedAt, member.FamilyId
        ));
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteMember(Guid familyId, Guid id)
    {
        var family = await GetOwnedFamily(familyId);
        if (family is null) return NotFound();

        var member = await _db.Members
            .FirstOrDefaultAsync(m => m.Id == id && m.FamilyId == familyId);

        if (member is null) return NotFound();

        _db.Members.Remove(member);
        await _db.SaveChangesAsync();

        return NoContent();
    }
}
