// LocationTask.js
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

const LOCATION_TASK_NAME = 'background-location-task';

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data: { locations }, error }) => {
  if (error) {
    console.error('Error in background location task:', error.message);
    return;
  }
  if (locations) {
    console.log('Received background location updates:', locations);
    // Handle the location update, e.g., send it to your server
  }
});

export default LOCATION_TASK_NAME;
