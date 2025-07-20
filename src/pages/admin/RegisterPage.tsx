import { RegisterForm } from '@zenra/components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Snackbar } from '@zenra/widgets';
import { RegisterCredentials } from '@zenra/models';
import { useLogin } from '@zenra/services';

export const RegisterPage = () => {
  const { t } = useTranslation();
  const { loginMutate } = useLogin();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    type: 'success' as const
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setNotification({
        open: true,
        message: 'Passwords do not match',
        type: 'error'
      });
      setLoading(false);
      return;
    }

    const payload: RegisterCredentials = {
      name,
      email,
      password,
      role: 'user'
    };

    loginMutate(payload, {
      onSuccess: (response) => {
        setLoading(false);
        setNotification({
          open: true,
          message: 'Registration successful! Welcome aboard.',
          type: 'success'
        });
        console.log('Registration successful:', response);
      },
      onError: (error) => {
        setLoading(false);
        setNotification({
          open: true,
          message: 'Registration failed. Please try again.',
          type: 'error'
        });
        setError('Registration failed. Please try again.');
        console.error('Registration error:', error);
      },
    });
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  }


  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2000&auto=format&fit=crop"
          alt="Sri Lanka Beach"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900 bg-opacity-30" />
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-8 text-white"
        // initial={{ opacity: 0, y: 20 }}
        // animate={{ opacity: 1, y: 0 }}
        // transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-2">{t('auth.register.imageTitle')}</h2>
          <p className="text-lg">{t('auth.register.imageSubtitle')}</p>
        </motion.div>
      </div>

      {/* Right side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <motion.div
          className="w-full max-w-md"
        // initial={{ opacity: 0, x: 20 }}
        // animate={{ opacity: 1, x: 0 }}
        // transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">{t('auth.register.title')}</h2>
            <p className="mt-2 text-gray-600">
              {t('auth.register.haveAccount')}{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium">
                {t('auth.register.signIn')}
              </Link>
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <RegisterForm
              onSubmit={handleSubmit}
              name={name}
              email={email}
              password={password}
              confirmPassword={confirmPassword}
              onChange={handleChange}
              error={error}
              loading={loading}
            />
          </div>
        </motion.div>
      </div>
      <Snackbar
        open={notification.open}
        message={notification.message}
        type={notification.type}
        onClose={handleCloseNotification}
      />
    </div>
  );
};