from django.db import models

class Form(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Question(models.Model):
    QUESTION_TYPES = [
        ('short_text', 'Short Text'),
        ('long_text', 'Long Text'),
        ('multiple_choice', 'Multiple Choice'),
        ('picture_choice', 'Picture Choice'),
    ]

    form = models.ForeignKey(Form, on_delete=models.CASCADE, related_name='questions')
    question_text = models.TextField()
    question_type = models.CharField(max_length=20, choices=QUESTION_TYPES)
    required = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.question_text} ({self.question_type})"

class Option(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='options')
    text = models.CharField(max_length=255)
    image_url = models.URLField(blank=True)  # Only used for picture choices

    def __str__(self):
        return self.text

# Optional: Store user responses
class Response(models.Model):
    form = models.ForeignKey(Form, on_delete=models.CASCADE, related_name='responses')
    submitted_at = models.DateTimeField(auto_now_add=True)

class Answer(models.Model):
    response = models.ForeignKey(Response, on_delete=models.CASCADE, related_name='answers')
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer_text = models.TextField(blank=True, null=True)  # Works for all types

    def __str__(self):
        return f"Answer to: {self.question.question_text}"