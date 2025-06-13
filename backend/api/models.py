from django.db import models

# Form that contains questions
class Form(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


# Question model with different types
class Question(models.Model):
    SHORT_TEXT = 'short_text'
    LONG_TEXT = 'long_text'
    MULTIPLE_CHOICE = 'multiple_choice'
    PICTURE_CHOICE = 'picture_choice'

    QUESTION_TYPES = [
        (SHORT_TEXT, 'Short Text'),
        (LONG_TEXT, 'Long Text'),
        (MULTIPLE_CHOICE, 'Multiple Choice'),
        (PICTURE_CHOICE, 'Picture Choice'),
    ]

    form = models.ForeignKey(Form, on_delete=models.CASCADE, related_name='questions')
    question_text = models.TextField()
    question_type = models.CharField(max_length=20, choices=QUESTION_TYPES)
    required = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.question_text} ({self.question_type})"


# Options for multiple choice / picture choice
class Option(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='options')
    text = models.CharField(max_length=255)
    image_url = models.URLField(blank=True, null=True)  # Used only for picture choice

    def __str__(self):
        return f"Option: {self.text}"


# Each form submission
class Response(models.Model):
    form = models.ForeignKey(Form, on_delete=models.CASCADE, related_name='responses')
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Response to {self.form.title} at {self.submitted_at}"


# Answers for each question in a form submission
class Answer(models.Model):
    response = models.ForeignKey(Response, on_delete=models.CASCADE, related_name='answers')
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    selected_option = models.ForeignKey(Option, on_delete=models.SET_NULL, null=True, blank=True)
    answer_text = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Answer to: {self.question.question_text}"
