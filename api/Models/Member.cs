namespace TheNumber.Api.Models;

public class Member
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string DisplayName { get; set; } = string.Empty;
    public string? AvatarEmoji { get; set; } = "🧒";
    public string Role { get; set; } = "child"; // "parent" | "child"
    public DateTime DateOfBirth { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Guid FamilyId { get; set; }
    public Family Family { get; set; } = null!;
}
