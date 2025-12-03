const registrationForm = document.getElementById('registrationForm');
const trackingForm = document.getElementById('trackingForm');
const reportForm = document.getElementById('reportForm');
const queueList = document.getElementById('queueList');
const trackingLog = document.getElementById('trackingLog');
const reportList = document.getElementById('reportList');
const metricRegistrations = document.getElementById('metricRegistrations');
const metricTransit = document.getElementById('metricTransit');
const metricReports = document.getElementById('metricReports');
const metricPending = document.getElementById('metricPending');

let registrations = [];
let trackingEntries = [];
let reports = [];

function renderQueue() {
    queueList.innerHTML = registrations
        .map((r) => `<li><strong>${r.name}</strong> · ${r.test} · ${r.priority} · ${r.date}</li>`)
        .join('');
    metricRegistrations.textContent = registrations.length;
}

function renderTracking() {
    trackingLog.innerHTML = trackingEntries
        .map(
            (t) => `<li><strong>${t.barcode}</strong> — ${t.status}<br><span class="muted">${t.specimen} · ${t.courier || 'N/A'} · ${t.temperature || '—'}${t.comment ? ' · ' + t.comment : ''}</span></li>`
        )
        .join('');
    const inTransit = trackingEntries.filter((t) => t.status === 'In Transit').length;
    metricTransit.textContent = inTransit;
}

function renderReports() {
    reportList.innerHTML = reports
        .map(
            (r) => `<li><strong>${r.patient}</strong> — ${r.test}<br><span class="muted">${r.status} · Rs. ${r.amount}</span></li>`
        )
        .join('');
    metricReports.textContent = reports.length;
    const pending = reports.filter((r) => r.status === 'Pending').length;
    metricPending.textContent = pending;
}

function handleForm(form, handler) {
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form).entries());
        handler(data);
        form.reset();
    });
}

handleForm(registrationForm, (data) => {
    registrations = [{
        name: data.name,
        test: data.test,
        priority: data.priority,
        date: data.date,
    }, ...registrations].slice(0, 10);
    renderQueue();
});

handleForm(trackingForm, (data) => {
    trackingEntries = [{
        barcode: data.barcode,
        specimen: data.specimen,
        status: data.status,
        courier: data.courier,
        temperature: data.temperature,
        comment: data.comment,
    }, ...trackingEntries].slice(0, 10);
    renderTracking();
});

handleForm(reportForm, (data) => {
    reports = [{
        patient: data.patient,
        test: data.test,
        result: data.result,
        consultant: data.consultant,
        amount: data.amount,
        status: data.status,
    }, ...reports].slice(0, 10);
    renderReports();
});

renderQueue();
renderTracking();
renderReports();
