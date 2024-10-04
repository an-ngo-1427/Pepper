from django import forms
from ..models import Appointment
from datetime import datetime
class UpdateAppointmentForm(forms.ModelForm):
    class Meta:
        model = Appointment
        fields=['companion','owner','status','appointment_notes','type','media_url','appointment_address']

    def clean(self):
        cleaned_data = super().clean()
        companion = cleaned_data.get('companion')
        owner = cleaned_data.get('owner')
        status = cleaned_data.get('status')
        type = cleaned_data.get('type')
        appointmentAddress = cleaned_data.get('appointment_address')
        print('this is instance',self.instance)
        start_time = self.instance.start_time
        end_time = self.instance.end_time
        specificDate = start_time.date()
        print('this is address',appointmentAddress)

        errors = {}
        if(appointmentAddress == ''):
            errors['appointment_address'] = 'address required'
        if(companion is None):
            errors['companion'] = 'companion required'
        if(owner is None):
            errors['owner'] = 'owner required'
        if(status == ''):
            errors['status'] = 'status required'
        if(type == ''):
            errors['type'] = 'type required'

        companionBookedAppts = Appointment.objects.filter(start_time__date = specificDate,companion = companion).order_by('start_time')
        if( not self.isValidSlot(start_time,end_time,companionBookedAppts)):
            raise forms.ValidationError('schedule conflict')
        if(self.instance.companion):
            raise forms.ValidationError('appointment is already booked')
        if errors:
            raise forms.ValidationError(errors)
    def isValidSlot(self,start_time,end_time,scheduledSlots):
        isValid = True
        for slot in scheduledSlots:
            startTime = slot.start_time
            endTime = slot.end_time
            if(start_time < endTime and end_time >= startTime ):
                isValid = False
                break
        return isValid
