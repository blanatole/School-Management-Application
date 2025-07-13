using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SchoolApp.Models.DataModels;
using SchoolApp.Models.DataModels.SecurityModels;

namespace SchoolApp.DAL.SchoolContext
{


    //public class SchoolDbContext : IdentityDbContext

    public class SchoolDbContext : IdentityDbContext<ApplicationUser>
    {

        #region DbSets
        public DbSet<Attendance> dbsAttendance { get; set; }

        //public DbSet<StudentAttendance> dbsStudentAttendance { get; set; }
        //public DbSet<StaffAttendance> dbsStaffAttendance { get; set; }

        public DbSet<Standard> dbsStandard { get; set; }
        public DbSet<Department> dbsDepartment { get; set; }
        public DbSet<ExamSchedule> dbsExamSchedule { get; set; }
        //public DbSet<ExamScheduleStandard> dbsExamScheduleStandard { get; set; }
        public DbSet<ExamSubject> dbsExamSubject { get; set; }
        public DbSet<ExamType> dbsExamType { get; set; }
        public DbSet<Mark> dbsMark { get; set; }
        public DbSet<Staff> dbsStaff { get; set; }
        public DbSet<StaffExperience> dbsStaffExperience { get; set; }
        public DbSet<StaffSalary> dbsStaffSalary { get; set; }
        public DbSet<Student> dbsStudent { get; set; }
        public DbSet<Subject> dbsSubject { get; set; }
        public DbSet<FeeType> dbsFeeType { get; set; }
        public DbSet<DueBalance> dbsDueBalance { get; set; }
        public DbSet<AcademicMonth> dbsAcademicMonths { get; set; }
        public DbSet<AcademicYear> dbsAcademicYears { get; set; }
        public DbSet<Fee> fees { get; set; }
        public DbSet<MonthlyPayment> monthlyPayments { get; set; }
        public DbSet<OthersPayment> othersPayments { get; set; }
        public DbSet<PaymentDetail> PaymentDetails { get; set; }
        public DbSet<OtherPaymentDetail> otherPaymentDetails { get; set; }
        public DbSet<PaymentMonth> paymentMonths { get; set; }
        public DbSet<ExamScheduleStandard> dbsExamScheduleStandard { get; set; }
        public DbSet<MarkEntry> dbsMarkEntry { get; set; }
        public DbSet<StudentMarksDetails> dbsStudentMarksDetails { get; set; }


        #endregion

        #region Constructor
        public SchoolDbContext(DbContextOptions<SchoolDbContext> options) : base(options)
        {

        }
        #endregion

        // Just Testing Purpose
        public override int SaveChanges()
        {                     
            return base.SaveChanges();
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<IdentityUserLogin<string>>()
            .HasKey(u => new { u.UserId, u.LoginProvider, u.ProviderKey });

            modelBuilder.Entity<IdentityUserRole<string>>()
        .HasKey(r => new { r.UserId, r.RoleId });


            // Configure the foreign key constraint for dbsMark referencing dbsSubject

            modelBuilder.Entity<Mark>()
                .HasOne(m => m.Subject)
                .WithMany()
                .HasForeignKey(m => m.SubjectId)
                .OnDelete(DeleteBehavior.NoAction);
            // Specify ON DELETE NO ACTION

            modelBuilder.Entity<StaffSalary>(entity =>
            {
            // Computed Column: https://dev.to/karenpayneoregon/sql-server-computed-columns-with-ef-core-3h8d

                entity.Property(e => e.NetSalary)
                    .HasComputedColumnSql("([BasicSalary] + [FestivalBonus] + [Allowance] + [MedicalAllowance] + [HousingAllowance] + [TransportationAllowance] - [SavingFund] - [Taxes])");


                //entity.Property(e => e.NetSalary)
                //    .HasComputedColumnSql("([BasicSalary] + [FestivalBonus] + [Allowance] + [MedicalAllowance] + [HousingAllowance] + [TransportationAllowance] - [SavingFund] - [Taxes])", false);

            });

            modelBuilder.Entity<StudentMarksDetails>()
        .HasKey(c => new { c.StudentId, c.MarkEntryId });


            #region Index
            modelBuilder.Entity<Subject>()
            .HasIndex(s => s.SubjectCode)
            .IsUnique();

        //    modelBuilder.Entity<Student>()
        //.HasIndex(s => s.AdmissionNo)
        //.IsUnique();

        //    modelBuilder.Entity<Student>()
        //.HasIndex(s => s.EnrollmentNo)
        //.IsUnique();

            modelBuilder.Entity<Student>()
                .HasIndex(s => s.UniqueStudentAttendanceNumber)
                .IsUnique();

            modelBuilder.Entity<Staff>()
                .HasIndex(s => s.UniqueStaffAttendanceNumber)
                .IsUnique();

            #endregion

            // All seed data sections removed to work with real data only
        }
    }
}