import React from 'react';
import { ChevronLeft, ChevronRight, Plus, Edit2, Calendar, Trash2 } from 'lucide-react';

const CalendarView = ({
  currentDate,
  appointments,
  formatDateKey,
  isSameMonth,
  isToday,
  dayNames,
  monthNames,
  getDaysInMonth,
  handleDayClick,
  handleEditAppointment,
  getPatientName,
  getDoctorName,
  navigateMonth,
  navigateDay,
  handleDeleteAppointment,
  setCurrentDate
}) => {
  const formatTo12Hour = (time24) => {
    const [hours, minutes] = time24.split(':');
    const date = new Date();
    date.setHours(+hours);
    date.setMinutes(+minutes);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const renderDesktopCalendar = () => {
    const days = getDaysInMonth(currentDate);
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
          <div className="flex space-x-2">
            <button onClick={() => navigateMonth(-1)} className="p-2 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 rounded-full"><ChevronLeft /></button>
            <button onClick={() => navigateMonth(1)} className="p-2 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 rounded-full"><ChevronRight /></button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-[1px] sm:gap-1 mb-1 sm:mb-2">
          {dayNames.map(day => <div key={day} className="p-1 sm:p-2 text-center text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">{day}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-[1px] sm:gap-1">
          {days.map((date, i) => {
            const key = formatDateKey(date);
            const items = appointments[key] || [];
            const curMonth = isSameMonth(date);
            return (
              <div
                key={i}
                onClick={() => handleDayClick(date)}
                className={`min-h-[90px] sm:min-h-[100px] p-1 sm:p-2 border border-sky-400 rounded text-xs sm:text-sm cursor-pointer transition-colors
                ${!curMonth ? 'bg-gray-50 dark:bg-gray-700 text-gray-400' : ''}
                ${isToday(date) ? 'bg-blue-200 dark:bg-blue-900 border-blue-300' : ''}
                ${curMonth && !isToday(date) ? 'bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700' : ''}`}
              >
                <div className={`font-medium mb-1 ${isToday(date) ? 'text-blue-600 dark:text-blue-400' : 'dark:text-white'}`}>{date.getDate()}</div>
                <div className="space-y-1">
                  {items.map(a => (
                    <div key={a.id} onClick={e => { e.stopPropagation(); handleEditAppointment(a, date); }} className="bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-[10px] sm:text-xs p-1 rounded hover:bg-blue-200 dark:hover:bg-blue-900">
                      <div className="truncate font-medium">{getPatientName(a.patientId)}</div>
                      <div className="truncate">{getDoctorName(a.doctorId)}</div>
                      <div> {formatTo12Hour(a.time)}     </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMobileCalendar = () => {
    const dateKey = formatDateKey(currentDate);
    const items = appointments[dateKey] || [];
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-3 sm:p-4 bg-blue-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between mb-2 sm:mb-4">
            <h2 className="text-lg sm:text-xl font-bold">Appointments</h2>
            <div className="flex space-x-2">
              <button onClick={() => navigateDay(-1)} className="p-2 hover:bg-blue-700  rounded-full"><ChevronLeft /></button>
              <button onClick={() => navigateDay(1)} className="p-2 hover:bg-blue-700 rounded-full"><ChevronRight /></button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <input type="date" value={dateKey} onChange={(e) => setCurrentDate(new Date(e.target.value))} className="bg-blue-700 text-white border-none rounded px-2 sm:px-3 py-1 sm:py-2 text-sm" />
          </div>
        </div>
        <div className="p-3 sm:p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base sm:text-lg font-semibold dark:text-white">{currentDate.toDateString()}</h3>
            <button onClick={() => handleDayClick(currentDate)} className="bg-[#c70039] text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"><Plus className="w-4 h-4" /><span>Add</span></button>
          </div>
          {!items.length ? (
            <div className="text-center text-gray-500 dark:text-gray-300">
              <Calendar className="w-12 h-12 mx-auto mb-2 text-gray-300 dark:text-gray-500" />
              <p>No appointments scheduled</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map(a => (
                <div key={a.id} className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg border border-sky-400">
                  <div className="flex  items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white mb-1">{getPatientName(a.patientId)}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">{getDoctorName(a.doctorId)}</div>
                      <div className="text-sm font-medium text-blue-600 dark:text-blue-400">{formatTo12Hour(a.time)}</div>
                    </div>
                    <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                      <button onClick={() => handleEditAppointment(a, currentDate)} className="p-2 text-blue-600 hover:bg-blue-100 dark:text-blue-300 dark:hover:bg-gray-600 rounded-full"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDeleteAppointment(a.id, currentDate)} className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-gray-600 rounded-full"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return { renderDesktopCalendar, renderMobileCalendar };
};

export default CalendarView;
