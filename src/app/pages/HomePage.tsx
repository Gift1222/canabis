import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import {
  FileText,
  CheckCircle,
  Clock,
  Shield,
  ArrowRight,
  Bell,
} from 'lucide-react';
import { mockAnnouncements } from '../data/mockData';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function HomePage() {
  const heroImageUrl = "https://images.unsplash.com/photo-1743363036194-7caa8fff0912?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxhd2klMjBsYW5kc2NhcGUlMjBhZ3JpY3VsdHVyZXxlbnwxfHx8fDE3NzQ5NTE2OTN8MA&ixlib=rb-4.1.0&q=80&w=1080";

  return (
    <div>
      {/* Hero */}
      <section className="relative text-white overflow-hidden" style={{ background: 'linear-gradient(135deg, #1B4D2E 0%, #0F2A19 100%)' }}>
        <div className="absolute inset-0 opacity-15">
          <ImageWithFallback src={heroImageUrl} alt="Malawi landscape" className="w-full h-full object-cover" />
        </div>
        {/* Gold accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: '#C9A84C' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase"
              style={{ backgroundColor: 'rgba(201,168,76,0.2)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.4)' }}>
              🌿 Official CRA Digital Portal
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Digital Cannabis Licensing<br />& Information System
            </h1>
            <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Malawi's official portal for cannabis regulation. Apply for licenses,
              track applications, and stay compliant with our streamlined digital platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/applicant/new-application">
                <button className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#C9A84C', color: '#1B4D2E' }}>
                  Apply for License <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link to="/license-types">
                <button className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm border transition-colors"
                  style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'white', backgroundColor: 'rgba(255,255,255,0.08)' }}>
                  View License Types
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div style={{ backgroundColor: '#2D6A4F' }} className="text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: 'Licenses Issued', value: '248' },
            { label: 'Active Applicants', value: '1,340+' },
            { label: 'Districts Covered', value: '28' },
            { label: 'Avg. Review Days', value: '14' },
          ].map(s => (
            <div key={s.label}>
              <div className="text-2xl font-bold" style={{ color: '#C9A84C' }}>{s.value}</div>
              <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.65)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3" style={{ color: '#1B4D2E' }}>Why Use DCLIS?</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Our platform simplifies the licensing process with digital applications,
            real-time tracking, and comprehensive regulatory support.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: FileText, title: 'Easy Applications', desc: 'Submit license applications online with guided forms and document upload support.', bg: '#EBF4EE', iconColor: '#1B4D2E' },
            { icon: Clock, title: 'Real-Time Tracking', desc: 'Monitor your application status and receive notifications at every stage.', bg: '#F5EDD6', iconColor: '#A8892A' },
            { icon: CheckCircle, title: 'Fast Approval', desc: 'Streamlined review process ensures faster decisions on your applications.', bg: '#EBF4EE', iconColor: '#2D6A4F' },
            { icon: Shield, title: 'Secure & Compliant', desc: 'Your data is protected with enterprise-grade security and regulatory compliance.', bg: '#F5EDD6', iconColor: '#A8892A' },
          ].map(f => {
            const Icon = f.icon;
            return (
              <Card key={f.title} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: f.bg }}>
                    <Icon className="w-6 h-6" style={{ color: f.iconColor }} />
                  </div>
                  <CardTitle className="text-base" style={{ color: '#1B4D2E' }}>{f.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{f.desc}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Announcements */}
      <section style={{ backgroundColor: '#EBF4EE' }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Bell className="w-6 h-6" style={{ color: '#1B4D2E' }} />
            <h2 className="text-2xl font-bold" style={{ color: '#1B4D2E' }}>Latest Announcements</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockAnnouncements.map(a => (
              <Card key={a.id} className="border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div>
                      <CardTitle className="text-base mb-1">{a.title}</CardTitle>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold"
                          style={{
                            backgroundColor: a.category === 'alert' ? '#FEE2E2' : a.category === 'regulation' ? '#EDE9FE' : '#EBF4EE',
                            color: a.category === 'alert' ? '#991B1B' : a.category === 'regulation' ? '#5B21B6' : '#1B4D2E',
                          }}>
                          {a.category}
                        </span>
                        <span className="text-xs text-gray-400">{a.publishDate}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{a.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-white py-16" style={{ background: 'linear-gradient(135deg, #1B4D2E 0%, #2D6A4F 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-3">Ready to Get Started?</h2>
          <p className="mb-8 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Join the regulated cannabis industry in Malawi. Apply for your license today
            and become part of a growing sector.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/applicant/new-application">
              <button className="px-6 py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#C9A84C', color: '#1B4D2E' }}>
                Start Application
              </button>
            </Link>
            <Link to="/about">
              <button className="px-6 py-3 rounded-lg font-medium text-sm border"
                style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'white', backgroundColor: 'rgba(255,255,255,0.08)' }}>
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
