using Microsoft.AspNetCore.Identity;

namespace TheNumber.Api.Models;

public class ApplicationUser : IdentityUser
{
    public string? DisplayName { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<Family> Families { get; set; } = new List<Family>();
}
