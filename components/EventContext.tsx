import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

export type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  description: string;
  attendees: string[]; // User IDs
};

type EventContextType = {
  events: Event[];
  rsvpToEvent: (eventId: string) => void;
  userRsvps: Event[];
};

const MOCK_EVENTS: Event[] = [
  {
    id: 'evt-1',
    title: 'Amapiano Sunset Sunday',
    date: 'Sunday, 25 Dec',
    time: '16:00 - Late',
    location: 'Mzansi Lounge Deck',
    image: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=800',
    description: 'The ultimate Sunday chill with DJ Maphorisa on the decks. Braai platters and cocktails on special.',
    attendees: [],
  },
  {
    id: 'evt-2',
    title: 'Deep House & Cognac',
    date: 'Friday, 30 Dec',
    time: '18:00 - 02:00',
    location: 'VIP Lounge',
    image: 'https://images.unsplash.com/photo-1571266028243-371695039989?w=800',
    description: 'Dress strictly smart casual. Hennessy specials all night. Live performance by Black Coffee.',
    attendees: [],
  },
  {
    id: 'evt-3',
    title: 'New Year\'s Eve Blowout',
    date: 'Saturday, 31 Dec',
    time: '20:00 - Sunrise',
    location: 'Main Floor',
    image: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=800',
    description: 'Welcome 2026 in style! Fireworks, champagne showers, and the best vibes in the city.',
    attendees: [],
  }
];

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const { user } = useAuth();

  const rsvpToEvent = (eventId: string) => {
    if (!user) return;
    
    setEvents(prev => prev.map(evt => {
      if (evt.id === eventId) {
        // Toggle RSVP
        const isAttending = evt.attendees.includes(user.id);
        const newAttendees = isAttending 
          ? evt.attendees.filter(id => id !== user.id)
          : [...evt.attendees, user.id];
        
        return { ...evt, attendees: newAttendees };
      }
      return evt;
    }));
  };

  const userRsvps = events.filter(evt => user && evt.attendees.includes(user.id));

  return (
    <EventContext.Provider value={{ events, rsvpToEvent, userRsvps }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
}
