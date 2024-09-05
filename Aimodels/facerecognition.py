import threading
import cv2
from deepface import DeepFace
import time

# Initialize video capture
cap = cv2.VideoCapture(0)

# Set frame width and height
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

counter = 0
face_match = False

# Load reference image for matching
reference_img = cv2.imread("photo1.jpg")  # Ensure the image path is correct

# Function to check face match
def check_face(frame):
    global face_match
    try:
        # Using DeepFace to verify face match
        result = DeepFace.verify(frame, reference_img.copy())['verified']
        face_match = result
    except Exception as e:
        print(f"Error in face verification: {e}")
        face_match = False

while True:
    ret, frame = cap.read()
    
    # If frame is captured
    if ret:
        # Check every 30 frames
        if counter % 30 == 0:
            try:
                # Run face matching in a separate thread
                threading.Thread(target=check_face, args=(frame.copy(),)).start()
            except ValueError as ve:
                print(f"Error starting thread: {ve}")
        counter += 1

        # Display result on the frame
        if face_match:
            cv2.putText(frame, "Match!", (20, 450), cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 255, 0), 3)
        else:
            cv2.putText(frame, "NO Match!", (20, 450), cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 0, 255), 3)
        
        # Show video
        cv2.imshow("video", frame)

    # Exit condition
    key = cv2.waitKey(1)
    if key == ord("q"):
        break

    # Optional: slow down the loop slightly
    time.sleep(0.01)

# Release video capture and close windows
cap.release()
cv2.destroyAllWindows()
