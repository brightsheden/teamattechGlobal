from django.apps import AppConfig


class MilestoneConfig(AppConfig):
    name = 'milestone'
    def ready(self):
        import milestone.signal
