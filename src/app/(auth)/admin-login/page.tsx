'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
  import { useAuth } from '@/hooks/useAuth';
  
  export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { loginAdmin } = useAuth();
  
    const handleAdminLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
  
      const adminEmail = 'academic.shop.nusantara@gmail.com';
      const adminPassword = '220801priga';
  
      if (email === adminEmail && password === adminPassword) {
        try {
          await loginAdmin(email, password);
          toast.success('Login Admin Berhasil');
          router.push('/admin/dashboard');
        } catch (error: any) {
          toast.error('Gagal Login Supabase: ' + (error.message || 'Error'));
        }
      } else {
        toast.error('Kredensial Admin Salah');
      }
      setLoading(false);
    };


  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
      <Card className="w-full max-w-md border-t-4 border-t-red-600 shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-slate-800">Login Admin</CardTitle>
          <CardDescription>Academic Shop Nusantara - Admin Panel</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Admin Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-slate-800 hover:bg-slate-700" disabled={loading}>
              {loading ? 'Memproses...' : 'Login Admin'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/login" className="text-sm text-slate-500 hover:text-blue-900 hover:underline transition-colors">
            Kembali ke Login User
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
