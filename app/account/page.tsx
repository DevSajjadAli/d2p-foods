'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Package, MapPin, Heart, Settings, LogOut, Edit3, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const mockOrders = [
  { id: 'D2P-ABC123', date: '2026-06-17', items: ['D2P Flame Burger', 'Crispy Fries (Large)'], total: 1349, status: 'Delivered', img: '/images/hero_burger.png' },
  { id: 'D2P-DEF456', date: '2026-06-14', items: ['Family Feast Box', 'Fresh Lemonade'], total: 3499, status: 'Delivered', img: '/images/hero_burger.png' },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('orders');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Ahmed Khan',
    email: 'ahmed@example.com',
    phone: '+92 300 1234567',
  });

  const [editForm, setEditForm] = useState(profile);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(editForm);
    setIsEditing(false);
  };

  return (
    <main className="min-h-screen bg-ash pb-32 pt-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between border border-gray-100">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center border-2 border-gray-200">
              <User size={40} className="text-gray-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-char mb-1">{profile.name}</h1>
              <p className="text-gray-500">{profile.email} • {profile.phone}</p>
            </div>
          </div>
          <button 
            onClick={() => setIsEditing(true)}
            className="mt-4 md:mt-0 px-6 py-2 border border-gray-300 rounded-lg text-char font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Edit3 size={16} /> Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-fit">
            <div className="flex flex-col">
              {[
                { id: 'orders', label: 'Order History', icon: Package },
                { id: 'addresses', label: 'My Addresses', icon: MapPin },
                { id: 'favorites', label: 'Favorites', icon: Heart },
                { id: 'settings', label: 'Settings', icon: Settings },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 p-4 text-left transition-colors border-l-4 ${
                      isActive 
                        ? 'border-ember bg-red-50 text-ember font-semibold' 
                        : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-char'
                    }`}
                  >
                    <Icon size={20} />
                    {tab.label}
                  </button>
                );
              })}
              <button className="flex items-center gap-3 p-4 text-left text-gray-600 hover:bg-gray-50 hover:text-char transition-colors border-l-4 border-transparent border-t border-t-gray-100">
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-3">
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-char mb-4">Past Orders</h2>
                {mockOrders.map((order) => (
                  <div key={order.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 relative rounded-lg overflow-hidden">
                          <Image src={order.img} alt="Order" fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold text-char">D2P Foods</p>
                          <p className="text-sm text-gray-500">Lahore • {order.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded mb-1">
                          {order.status}
                        </span>
                        <p className="text-gray-500 text-sm">#{order.id}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{order.items.join(', ')}</p>
                    <div className="flex items-center justify-between pt-2">
                      <p className="font-bold text-char">Total: Rs. {order.total.toLocaleString()}</p>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-ember/10 text-ember font-semibold rounded-lg hover:bg-ember/20 transition-colors">
                          Reorder
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-char">Saved Addresses</h2>
                  <button className="text-ember font-semibold hover:underline">+ Add New</button>
                </div>
                <div className="border border-gray-200 rounded-xl p-4 flex items-start gap-3">
                  <MapPin className="text-ember mt-1 shrink-0" />
                  <div>
                    <h3 className="font-bold text-char flex items-center gap-2">
                      Home <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded">Primary</span>
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">House 12, Street 4, Gulberg III, Lahore</p>
                    <div className="flex gap-4 mt-3">
                      <button className="text-ember text-sm font-medium hover:underline">Edit</button>
                      <button className="text-gray-500 text-sm font-medium hover:underline">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center py-16">
                <Heart size={48} className="mx-auto text-gray-300 mb-4" />
                <h2 className="text-xl font-bold text-char mb-2">No Favorites Yet</h2>
                <p className="text-gray-500 mb-6">Save your favorite restaurants and dishes to find them quickly.</p>
                <Link href="/menu" className="px-6 py-2 bg-ember text-white font-bold rounded-lg hover:bg-red-600 transition-colors">
                  Explore Menu
                </Link>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-char mb-6">Account Settings</h2>
                <p className="text-gray-600 mb-4">Manage your communication preferences and account security.</p>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-ember rounded border-gray-300 focus:ring-ember" />
                    <span className="text-gray-700">Receive promotional emails</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-ember rounded border-gray-300 focus:ring-ember" />
                    <span className="text-gray-700">Receive SMS notifications for orders</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditing(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden z-10 p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-char">Edit Profile</h2>
                <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-char">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={editForm.name} 
                    onChange={e => setEditForm({...editForm, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ember focus:border-ember outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    value={editForm.email} 
                    onChange={e => setEditForm({...editForm, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ember focus:border-ember outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    value={editForm.phone} 
                    onChange={e => setEditForm({...editForm, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ember focus:border-ember outline-none"
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-ember text-white font-bold py-3 rounded-xl hover:bg-red-600 transition-colors mt-6"
                >
                  Save Changes
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
