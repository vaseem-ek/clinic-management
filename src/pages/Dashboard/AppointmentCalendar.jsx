import React, { useState, useEffect, useContext } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, Edit2, Calendar, Trash2 } from 'lucide-react';
import { patients, doctors } from '../../constant';
import AppointmentModal from './modal/AppointmentModal';
import CalendarView from '../../components/CalendarView';
import Navbar from '../../components/Navbar';
import { ThemeContext } from '../../context/ThemeContext';

const AppointmentCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingAppointment, setEditingAppointment] = useState(null);
    const [formData, setFormData] = useState({ patientId: '', doctorId: '', time: '' });
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const getAppointmentsData = () => {
        const raw = localStorage.getItem('application');
        if (!raw) return;
        const appointments = JSON.parse(raw);
        if (!Array.isArray(appointments)) return;
        const grouped = appointments.reduce((acc, curr) => {
            if (!acc[curr.date]) acc[curr.date] = [];
            acc[curr.date].push(curr);
            return acc;
        }, {});
        setAppointments(grouped);
    };


    useEffect(() => getAppointmentsData(), []);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getPatientName = (id) => patients.find(p => p.id === id)?.name || 'Unknown Patient';
    const getDoctorName = (id) => doctors.find(d => d.id === id)?.name || 'Unknown Doctor';
    const formatDateKey = (date) => date.toLocaleDateString('en-CA'); // Fix for timezone issue

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const first = new Date(year, month, 1);
        const start = new Date(first);
        start.setDate(start.getDate() - start.getDay());
        return Array.from({ length: 42 }, (_, i) => {
            const d = new Date(start);
            d.setDate(d.getDate() + i);
            return d;
        });
    };

    const navigateMonth = (dir) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + dir);
        setCurrentDate(newDate);
    };

    const navigateDay = (dir) => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + dir);
        setCurrentDate(newDate);
    };

    const handleDayClick = (date) => {
        setSelectedDate(date);
        setShowForm(true);
        setEditingAppointment(null);
        setFormData({ patientId: '', doctorId: '', time: '' });
    };

    const handleEditAppointment = (apt, date) => {
        setSelectedDate(date);
        setEditingAppointment(apt);
        setFormData({ patientId: apt.patientId.toString(), doctorId: apt.doctorId.toString(), time: apt.time });
        setShowForm(true);
    };

    const handleSaveAppointment = () => {
        if (!formData.patientId || !formData.doctorId || !formData.time) return;
        const dateKey = formatDateKey(selectedDate);
        const newAppointments = { ...appointments };
        let allAppointments = JSON.parse(localStorage.getItem('application')) || [];

        if (editingAppointment) {
            const updated = { ...editingAppointment, ...formData, patientId: +formData.patientId, doctorId: +formData.doctorId, date: dateKey };
            allAppointments = allAppointments.map(a => a.id === editingAppointment.id ? updated : a);
            newAppointments[dateKey] = newAppointments[dateKey].map(a => a.id === editingAppointment.id ? updated : a);
        } else {
            const newApt = { id: Date.now(), date: dateKey, patientId: +formData.patientId, doctorId: +formData.doctorId, time: formData.time };
            allAppointments.push(newApt);
            newAppointments[dateKey] = [...(newAppointments[dateKey] || []), newApt];
        }

        localStorage.setItem('application', JSON.stringify(allAppointments));
        setAppointments(newAppointments);
        setShowForm(false);
        setFormData({ patientId: '', doctorId: '', time: '' });
        setEditingAppointment(null);
        setSelectedDate(null);
    };

    const handleDeleteAppointment = (id, date) => {
        if (!confirm("Are you sure you want to delete this appointment?")) return;
        let allAppointments = JSON.parse(localStorage.getItem('application')) || [];
        allAppointments = allAppointments.filter(a => a.id !== id);
        localStorage.setItem('application', JSON.stringify(allAppointments));
        const dateKey = formatDateKey(date);
        const newAppointments = { ...appointments };
        newAppointments[dateKey] = newAppointments[dateKey].filter(a => a.id !== id);
        if (!newAppointments[dateKey].length) delete newAppointments[dateKey];
        setAppointments(newAppointments);
        setShowForm(false);
        setFormData({ patientId: '', doctorId: '', time: '' });
        setEditingAppointment(null);
        setSelectedDate(null);
    };

    const isToday = (date) => date.toDateString() === new Date().toDateString();
    const isSameMonth = (date) => date.getMonth() === currentDate.getMonth();

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const { renderDesktopCalendar, renderMobileCalendar } = CalendarView({
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
    });

    return (
        <>
        <Navbar />
        <div className="min-h-screen dark:bg-slate-400 bg-gray-100 p-2 sm:p-4">
            <div className="max-w-full sm:max-w-4xl md:max-w-5xl lg:max-w-7xl mx-auto">
                {isMobile ? renderMobileCalendar() : renderDesktopCalendar()}
                <AppointmentModal
                    showForm={showForm}
                    setShowForm={setShowForm}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    formatDateKey={formatDateKey}
                    editingAppointment={editingAppointment}
                    setFormData={setFormData}
                    formData={formData}
                    patients={patients}
                    doctors={doctors}
                    handleSaveAppointment={handleSaveAppointment}
                    handleDeleteAppointment={handleDeleteAppointment}
                />
            </div>
        </div>
        </>
    );
};

export default AppointmentCalendar;