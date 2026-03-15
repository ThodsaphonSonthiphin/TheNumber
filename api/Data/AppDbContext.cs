using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TheNumber.Api.Models;

namespace TheNumber.Api.Data;

public class AppDbContext : IdentityDbContext<ApplicationUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Family> Families => Set<Family>();
    public DbSet<Member> Members => Set<Member>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Family>(entity =>
        {
            entity.HasKey(f => f.Id);
            entity.Property(f => f.Name).IsRequired().HasMaxLength(100);
            entity.HasOne(f => f.User)
                  .WithMany(u => u.Families)
                  .HasForeignKey(f => f.UserId)
                  .OnDelete(DeleteBehavior.Cascade);
            entity.HasMany(f => f.Members)
                  .WithOne(m => m.Family)
                  .HasForeignKey(m => m.FamilyId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Member>(entity =>
        {
            entity.HasKey(m => m.Id);
            entity.Property(m => m.DisplayName).IsRequired().HasMaxLength(100);
            entity.Property(m => m.Role).IsRequired().HasMaxLength(20);
        });
    }
}
