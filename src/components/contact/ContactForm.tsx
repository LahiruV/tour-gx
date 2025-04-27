import { useState } from 'react';
import { TextField, Button } from '@zenra/widgets';
import { EnvelopeIcon, PhoneIcon, UserIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const ContactForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        {t('contact.form.title')}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <TextField
          label={t('contact.form.name')}
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          startIcon={<UserIcon className="h-5 w-5" />}
        />

        <TextField
          label={t('contact.form.email')}
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          startIcon={<EnvelopeIcon className="h-5 w-5" />}
        />

        <TextField
          label={t('contact.form.phone')}
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          startIcon={<PhoneIcon className="h-5 w-5" />}
        />

        <TextField
          label={t('contact.form.message.label')}
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          multiline
          rows={4}
          helperText={t('contact.form.message.placeholder')}
        />

        <Button
          style={{ marginTop: '90px' }}
          type="submit"
          variant="primary"
          size="large"
          fullWidth
        >
          {t('contact.form.submit')}
        </Button>
      </form>
    </div>
  );
};