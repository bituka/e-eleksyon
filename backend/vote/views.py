from vote.models import Candidate, Position
from vote.serializers import CandidateSerializer, PositionSerializer

from rest_framework import generics


class CandidateList(generics.ListCreateAPIView):
    queryset = Candidate.objects.all()
    serializer_class = CandidateSerializer


class PositionList(generics.ListCreateAPIView):
    queryset = Position.objects.all()
    serializer_class = PositionSerializer
