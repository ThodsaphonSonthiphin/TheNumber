namespace TheNumber.Api.Models;

public class Family
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string? AvatarEmoji { get; set; } = "👨‍👩‍👧‍👦";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public string UserId { get; set; } = string.Empty;
    public ApplicationUser User { get; set; } = null!;

    public ICollection<Member> Members { get; set; } = new List<Member>();
}
