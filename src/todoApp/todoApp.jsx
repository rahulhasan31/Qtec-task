
import { useState,useEffect } from 'react';

const TodoApp = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [priority, setPriority] = useState('low');
    const [filter, setFilter] = useState('all')
  console.log(tasks);
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks) {
          setTasks(storedTasks);
        }
      }, []);
    
      useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }, [tasks]);
    
      const handleChange = (e) => {
        setNewTask(e.target.value);
      };
    
      const handlePriorityChange = (e) => {
        setPriority(e.target.value);
      };
    
      const handleFilterChange = (e) => {
        setFilter(e.target.value);
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (!newTask) return;
        const task = {
          id: Date.now(),
          text: newTask,
          completed: false,
          priority: priority,
        };
        setTasks([...tasks, task]);
        setNewTask('');
      };
    
      const toggleTaskStatus = (id) => {
        const updatedTasks = tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
      };
    
      const deleteTask = (id) => {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
      };
    
      const filteredTasks = tasks.filter((task) => {
        if (filter === 'all') return true;
        return task.priority === filter;
      });
   
      
    return (
        <div>
             <div className="bg-gray-300 h-screen">
      <h1 className='text-center font-semibold text-4xl p-5 text-gray-900 bg-green-300 mb-5'>TODO LIST</h1>
      <form onSubmit={handleSubmit} className='text-center'>
      <div className="join">
  <div>
    <div>
      <input     placeholder="Enter new task"
          value={newTask}
          onChange={handleChange} required className="input input-bordered join-item"/>
    </div>
  </div>
  <select value={priority} onChange={handlePriorityChange} className="select select-bordered join-item">
  <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
  </select>
  <div className="indicator">
    <span className="indicator-item badge badge-secondary">Add New Task</span> 
    <button className="btn join-item">Submit</button>
  </div>
</div>
      
      </form>
      <div className='text-center'>
        <h2 className='text-red-500 text-4xl mt-3 font-bold'>Tasks</h2>
        <p className='text-red-600 text-xl font-medium'>Total Tasks: {tasks.length}</p>
        <p className='text-green-900 font-medium text-xl'>Completed Tasks: {tasks.filter((task) => task.completed).length}</p>
        <label htmlFor="filter" className='text-orange-600 text-2xl font-semibold me-3'>Filter by Priority:</label>
        
        <select id="filter" value={filter} onChange={handleFilterChange} className="select select-success w-full max-w-32 h-10 mt-3">
        <option value="all">All</option>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
</select>
      
        <div className="overflow-x-auto">
 
</div >
        <ul>
          {filteredTasks.map((task) => (

          
            <li key={task.id} className={task.completed ? 'completed' : ''}>
     <div className='text-center'>
     {
        task.priority==="low" ?<>
                <div className={`overflow-x-auto mt-4  bg-green-400`}>
  <table className="table">
   
    <tbody className='w-96 text-center'>
    
      <tr>
      
        <td className={`font-medium  text-xl`}>{task.text}</td>
        <td> <input type="checkbox" className="toggle toggle-success" checked={task.completed}
                onChange={() => toggleTaskStatus(task.id)}/></td>
        <td><button className="btn  btn-primary" onClick={() => deleteTask(task.id)}>Delete</button></td>
      </tr>
     
    </tbody>
  </table>
</div>
        </>:<>
        
        </>
      }
      {
        task.priority==="medium"?<>
                <div className={`overflow-x-auto mt-4  bg-orange-400`}>
  <table className="table">
   
    <tbody className='w-96 text-center'>
    
      <tr>
      
        <td className={`font-medium  text-xl`}>{task.text}</td>
        <td> <input type="checkbox" className="toggle toggle-success" checked={task.completed}
                onChange={() => toggleTaskStatus(task.id)}/></td>
        <td><button className="btn  btn-secondary" onClick={() => deleteTask(task.id)}>Delete</button></td>
      </tr>
     
    </tbody>
  </table>
</div>
        </>:<></>
      }

      {
        task.priority==="high"?<>        <div className={`overflow-x-auto mt-4  bg-red-600`}>
        <table className="table">
         
          <tbody className='w-96 text-center'>
          
            <tr>
            
              <td className={`font-medium  text-xl`}>{task.text}</td>
              <td> <input type="checkbox" className="toggle toggle-success" checked={task.completed}
                      onChange={() => toggleTaskStatus(task.id)}/></td>
              <td><button className="btn  btn-accent" onClick={() => deleteTask(task.id)}>Delete</button></td>
            </tr>
           
          </tbody>
        </table>
      </div></>:<></>
      }
     </div>
             
            </li>
          ))}
        </ul>
      </div>
    </div>
        </div>
    );
};

export default TodoApp;