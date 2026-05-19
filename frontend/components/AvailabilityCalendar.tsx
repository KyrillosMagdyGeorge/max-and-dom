'use client';

import { useEffect, useMemo, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { api } from '@/lib/api';

type CalendarEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  status: 'pending' | 'approved' | 'rejected';
  color: string;
};

type Props = {
  selectable?: boolean;
  onRangeSelect?: (range: { start: Date; end: Date }) => void;
};

export default function AvailabilityCalendar({
  selectable = false,
  onRangeSelect,
}: Props) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api<CalendarEvent[]>('/calendar')
      .then(setEvents)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const bgEvents = useMemo(
    () =>
      events.map((e) => ({
        id: e.id,
        start: e.start,
        end: e.end,
        display: 'background',
        color: e.color,
        title: e.title,
      })),
    [events]
  );

  return (
    <div className="card">
      <div className="mb-4 flex flex-wrap items-center gap-4 text-sm">
        <Legend color="#15803d" label="Available" />
        <Legend color="#ca8a04" label="Pending" />
        <Legend color="#b91c1c" label="Booked" />
      </div>
      {error && <p className="mb-2 text-darkred">{error}</p>}
      {loading ? (
        <p className="text-brown/70">Loading calendar…</p>
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          height="auto"
          selectable={selectable}
          selectMirror={selectable}
          selectOverlap={(ev) => ev.display === 'background' && ev.backgroundColor !== '#b91c1c'}
          select={(info) => {
            if (selectable && onRangeSelect) {
              onRangeSelect({ start: info.start, end: info.end });
            }
          }}
          events={bgEvents}
          eventDisplay="background"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: '',
          }}
        />
      )}
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-brown/80">
      <span
        className="inline-block h-3 w-3 rounded-sm"
        style={{ backgroundColor: color }}
      />
      {label}
    </span>
  );
}
