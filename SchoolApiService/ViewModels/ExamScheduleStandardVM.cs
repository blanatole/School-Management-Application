namespace SchoolApiService.ViewModels
{
    public class ExamScheduleStandardVM
    {
        public int ExamScheduleStandardId { get; set; }
        public int? ExamScheduleId { get; set; }
        public int? StandardId { get; set; }
        public string? StandardName { get; set; }
        public string? ExamScheduleName { get; set; }
        public IEnumerable<ExamSubjectVM>? ExamSubjects { get; set; } = [];
    }

    public class UpcomingExamVM
    {
        public int ExamSubjectId { get; set; }
        public string? ExamScheduleName { get; set; }
        public string? SubjectName { get; set; }
        public int? SubjectCode { get; set; }
        public string? ExamTypeName { get; set; }
        public DateTime? ExamDate { get; set; }
        public DateTime? ExamStartTime { get; set; }
        public DateTime? ExamEndTime { get; set; }
        public int DaysUntilExam { get; set; }
    }
}
