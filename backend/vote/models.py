from django.db import models

class Position(models.Model):
    title = models.CharField(max_length=250)

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.title

class Candidate(models.Model):
    name = models.CharField(max_length=250)
    position= models.ForeignKey(Position, on_delete=models.CASCADE)
    votes = models.IntegerField(default = 0)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

    # def vote(self, user):
    #     try:
    #         self.candidate_votes.create(user=user, post=self)
    #         self.votes += 1
    #         self.save()
    #     except IntegrityError:
    #         return 'already_voted'
    #     return 'ok'

