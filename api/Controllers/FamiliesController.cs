using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TheNumber.Api.Data;
using TheNumber.Api.Models;

namespace TheNumber.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class FamiliesController : ControllerBase
{
    private readonly AppDbContext _db;

    public FamiliesController(AppDbContext db)
    {
        _db = db;
    }

    private string GetUserId() =>
        User.FindFirstValue(ClaimTypes.NameIdentifier)
        ?? throw new UnauthorizedAccessException("Missing user ID from token");

    [HttpGet]
    public async Task<ActionResult<List<FamilyResponse>>> GetMyFamilies()
    {
        var userId = GetUserId();
        var families = await _db.Families
            .Include(f => f.Members)
            .Where(f => f.UserId == userId)
            .OrderByDescending(f => f.CreatedAt)
            .Select(f => ToFamilyResponse(f))
            .ToListAsync();

        return Ok(families);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<FamilyResponse>> GetFamily(Guid id)
    {
        var userId = GetUserId();
        var family = await _db.Families
            .Include(f => f.Members)
            .FirstOrDefaultAsync(f => f.Id == id && f.UserId == userId);

        if (family is null) return NotFound();

        return Ok(ToFamilyResponse(family));
    }

    [HttpPost]
    public async Task<ActionResult<FamilyResponse>> CreateFamily(CreateFamilyRequest request)
    {
        var userId = GetUserId();
        var family = new Family
        {
            Name = request.Name,
            AvatarEmoji = request.AvatarEmoji ?? "👨‍👩‍👧‍👦",
            UserId = userId,
        };

        _db.Families.Add(family);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetFamily), new { id = family.Id }, ToFamilyResponse(family));
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<FamilyResponse>> UpdateFamily(Guid id, UpdateFamilyRequest request)
    {
        var userId = GetUserId();
        var family = await _db.Families
            .Include(f => f.Members)
            .FirstOrDefaultAsync(f => f.Id == id && f.UserId == userId);

        if (family is null) return NotFound();

        family.Name = request.Name;
        family.AvatarEmoji = request.AvatarEmoji;
        await _db.SaveChangesAsync();

        return Ok(ToFamilyResponse(family));
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteFamily(Guid id)
    {
        var userId = GetUserId();
        var family = await _db.Families
            .FirstOrDefaultAsync(f => f.Id == id && f.UserId == userId);

        if (family is null) return NotFound();

        _db.Families.Remove(family);
        await _db.SaveChangesAsync();

        return NoContent();
    }

    private static FamilyResponse ToFamilyResponse(Family f) => new(
        f.Id,
        f.Name,
        f.AvatarEmoji,
        f.CreatedAt,
        f.Members.Count,
        f.Members.Select(m => new MemberResponse(
            m.Id, m.DisplayName, m.AvatarEmoji, m.Role,
            m.DateOfBirth, m.CreatedAt, m.FamilyId
        )).ToList()
    );
}
