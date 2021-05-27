from rest_framework import serializers
from vote.models import Position, Candidate

class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = ['name', 'position', 'votes']

class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = ['title']