import React, { useState, useEffect } from "react"
import axios from "axios"
import DateTimePicker from "react-datetime-picker"

import './App.css'
import Navbar from "./components/Navbar"

function App() {

  const [ reminderMsg, setReminderMsg ] = useState("")
  const [ remindAt, setRemindAt ] = useState()
  const [ reminderList, setReminderList ] = useState([])

  useEffect(() => {
      axios.get("http://localhost:3000/getAllReminder").then( res => setReminderList(res.data))
  }, [])

  const addReminder = () => {
      axios.post("http://localhost:3000/addReminder", { reminderMsg, remindAt })
      .then( res => setReminderList(res.data))
      setReminderMsg("")
      setRemindAt()
  }

  const deleteReminder = (id) => {
    axios.post("http://localhost:3000/deleteReminder", { id })
    .then( res => setReminderList(res.data))
  }

  return (  
    <> 
     <Navbar /> 
     <div className="text-center text-dark">
       <h1>healthGuard - A reminder App</h1>
       <b> <p> Add your health remainder here and we will notify it to you on Whatsapp</p></b>
     </div>
     
    <div className="App">
      <div className="homepage">

        <div className="homepage_header">
          <h1>Remind Me</h1>
          <input type="text" placeholder="Reminder notes here..." value={reminderMsg} onChange={e => setReminderMsg(e.target.value)} />
          <DateTimePicker 
            value={remindAt}
            onChange={setRemindAt}
            minDate={new Date()}
            minutePlaceholder="mm"
            hourPlaceholder="hh"
            dayPlaceholder="DD"
            monthPlaceholder="MM"
            yearPlaceholder="YYYY"
          />
          <div className="button" onClick={addReminder}>Add Reminder</div>
        </div>

        <div className="homepage_body">
          {
            reminderList.map( reminder => (
              <div className="reminder_card" key={reminder._id}>
                <h2>{reminder.reminderMsg}</h2>
                <h3>Remind Me at:</h3>
                <p>{String(new Date(reminder.remindAt.toLocaleString(undefined, {timezone:"Asia/Kolkata"})))}</p>
                <div className="button" onClick={() => deleteReminder(reminder._id)}>Delete</div>
              </div>
            ))
          }
           
        </div>

      </div>
    </div>
    </>
  )
}

export default App;
