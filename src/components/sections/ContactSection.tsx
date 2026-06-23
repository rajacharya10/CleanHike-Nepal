import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/Button';
import { Input, Textarea } from '../ui/Input';
import { ScrollReveal } from '../common/ContainerScroll';
import { submitContactForm } from '../../services/contact';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    content: 'Dakshinkali, Kathmandu, Nepal',
    link: '#',
  },
  {
    icon: Mail,
    title: 'Email Us',
    content: 'hello@cleanhike.com',
    link: 'mailto:hello@cleanhike.com',
  },
  {
    icon: Phone,
    title: 'Call Us',
    content: '+977 1-423-4567',
    link: 'tel:+97714234567',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    content: 'Mon-Sat, 9AM - 6PM',
    link: '#',
  },
];

export function ContactSection() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
  try {
    setSubmitStatus('idle');

    await submitContactForm(data);

    setSubmitStatus('success');

    reset();
  } catch (error) {
    console.error(error);

    setSubmitStatus('error');
  }
};

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4">
              <Mail className="w-4 h-4" />
              Get in Touch
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Let's Start Your
              <br />
              <span className="bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
                Nepal Adventure
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Have questions about our hikes, donations, or partnership opportunities? We'd love to hear from you.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <ScrollReveal className="lg:col-span-2">
            <div className="space-y-6">
              {contactInfo.map((info) => (
                <motion.a
                  key={info.title}
                  href={info.link}
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-emerald-500/30 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{info.title}</p>
                    <p className="text-gray-900 dark:text-white font-medium group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {info.content}
                    </p>
                  </div>
                </motion.a>
              ))}

              {/* Map Placeholder */}
              <div className="relative rounded-2xl overflow-hidden h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Kathmandu, Nepal</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal className="lg:col-span-3">
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-lg"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  {...register('name')}
                  id="name"
                  label="Your Name"
                  placeholder="John Doe"
                  error={errors.name?.message}
                />
                <Input
                  {...register('email')}
                  id="email"
                  type="email"
                  label="Email Address"
                  placeholder="john@example.com"
                  error={errors.email?.message}
                />
              </div>
              <div className="mt-6">
                <Input
                  {...register('subject')}
                  id="subject"
                  label="Subject"
                  placeholder="Inquiry about Everest Base Camp trek"
                  error={errors.subject?.message}
                />
              </div>
              <div className="mt-6">
                <Textarea
                  {...register('message')}
                  id="message"
                  label="Message"
                  rows={5}
                  placeholder="Tell us about your inquiry..."
                  error={errors.message?.message}
                />
              </div>
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <p className="font-medium text-emerald-800 dark:text-emerald-200">Message sent successfully!</p>
                    <p className="text-sm text-emerald-600 dark:text-emerald-400">We'll get back to you within 24 hours.</p>
                  </div>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  <div>
                    <p className="font-medium text-red-800 dark:text-red-200">Failed to send message</p>
                    <p className="text-sm text-red-600 dark:text-red-400">Please try again or email us directly.</p>
                  </div>
                </motion.div>
              )}

              <div className="mt-8">
                <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </div>
            </motion.form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
