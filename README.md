# Trackify - Geolocation-Based Attendance Tracking App

## Overview

**Trackify** is an innovative mobile application designed for seamless attendance tracking using advanced geolocation technologies. Developed by **Team Axios** for the **Smart India Hackathon 2024**, it addresses the challenges of traditional attendance systems by offering automated check-ins, real-time GPS-based location suggestions, offline functionality, and secure data handling.

---

## Features

### 1. **Automatic Check-ins**
- Geofencing technology automatically records employee attendance within a 200-meter radius of the office.
- Reduces manual errors and ensures efficient tracking.

### 2. **Offsite Attendance**
- Suggests check-in locations for offsite employees using real-time GPS data.
- Streamlined approval process for admins via WhatsApp integration.

### 3. **Total Working Hours Calculation**
- Automatically calculates and logs daily working hours based on check-in and check-out times.
- Provides tamper-proof attendance records.

### 4. **Face Recognition**
- Utilizes a Siamese neural network for secure and accurate employee verification.
- Reduces fraud by ensuring only authorized employees check in.

### 5. **Fake GPS Detection**
- Employs GNSS technology to detect and block fake GPS data.
- Ensures reliable attendance records.

### 6. **Offline Attendance**
- Enables attendance logging without internet access.
- Syncs data automatically once the device reconnects to the network.

### 7. **Battery Optimization**
- Implements speed and distance-based polling to minimize battery usage.
- Reduces location update frequency when stationary.

---
## Screeshots:
<p float="left">
 <img src="./frontend/assets/track SS/IMG-20250103-WA0006.jpg" alt="landing"  height="500" >
  <img src="/frontend/assets/track SS/IMG-20250103-WA0008.jpg" alt="image 1"  height="500">
  <img src="/frontend/assets/track SS/IMG-20250103-WA0005.jpg" alt="image 2"  height="500">
    <img src="/frontend/assets/track SS/IMG-20250103-WA0007.jpg" alt="image 3"  height="500">
</p>
---

## Technical Stack

- **Frontend:** React Native, Expo
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Geospatial Indexing for GPS data)
- **Machine Learning:** Siamese neural networks for face recognition


---

  


