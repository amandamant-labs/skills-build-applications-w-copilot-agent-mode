from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models

from octofit_tracker import models as octofit_models

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        User = get_user_model()
        # Limpar dados existentes de forma segura para Djongo
        for model in [octofit_models.Activity, octofit_models.Leaderboard, octofit_models.Workout, octofit_models.Team]:
            objs = model.objects.all()
            if objs.exists():
                for obj in objs:
                    obj.delete()
        users = User.objects.all()
        if users.exists():
            for user in users:
                user.delete()

        # Criar times
        marvel = octofit_models.Team.objects.create(name='Marvel')
        dc = octofit_models.Team.objects.create(name='DC')

        # Criar usuários
        tony = User(username='tony', email='tony@marvel.com', team=marvel)
        tony.set_password('123')
        tony.save()
        steve = User(username='steve', email='steve@marvel.com', team=marvel)
        steve.set_password('123')
        steve.save()
        bruce = User(username='bruce', email='bruce@marvel.com', team=marvel)
        bruce.set_password('123')
        bruce.save()
        clark = User(username='clark', email='clark@dc.com', team=dc)
        clark.set_password('123')
        clark.save()
        diana = User(username='diana', email='diana@dc.com', team=dc)
        diana.set_password('123')
        diana.save()
        barry = User(username='barry', email='barry@dc.com', team=dc)
        barry.set_password('123')
        barry.save()

        # Criar atividades
        octofit_models.Activity.objects.create(user=tony, type='run', duration=30, distance=5)
        octofit_models.Activity.objects.create(user=steve, type='cycle', duration=60, distance=20)
        octofit_models.Activity.objects.create(user=clark, type='swim', duration=45, distance=2)

        # Criar leaderboard
        octofit_models.Leaderboard.objects.create(user=tony, points=100)
        octofit_models.Leaderboard.objects.create(user=clark, points=90)
        octofit_models.Leaderboard.objects.create(user=diana, points=80)

        # Criar workouts
        octofit_models.Workout.objects.create(name='Full Body', description='Treino completo para super-heróis')
        octofit_models.Workout.objects.create(name='Cardio Power', description='Cardio intenso para resistência')

        self.stdout.write(self.style.SUCCESS('Banco populado com dados de teste!'))
