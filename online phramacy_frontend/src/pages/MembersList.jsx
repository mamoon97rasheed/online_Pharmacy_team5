import React, { useEffect, useState } from "react";
import memberService from "../services/memberService";

export default function MembersList() {
  const [members, setMembers] = useState([]);

  useEffect(() => { load(); }, []);

  const load = async () => {
    try { const data = await memberService.getAll(); setMembers(data); } catch(e) { console.error(e); }
  };

  const doAction = async (id, action) => {
    try {
      if (action === "approve") await memberService.approve(id);
      if (action === "disable") await memberService.disable(id);
      if (action === "delete") await memberService.remove(id);
      load();
    } catch (e) { alert("Action failed"); }
  };

  return (
    <div>
      <h2>Members</h2>
      <table className="table">
        <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Mobile</th><th>Role</th><th>Actions</th></tr></thead>
        <tbody>
          {members.map(m => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.name}</td>
              <td>{m.email}</td>
              <td>{m.mobile}</td>
              <td>{m.role}</td>
              <td>
                <button className="btn" onClick={() => doAction(m.id, "approve")}>Approve</button>
                <button className="btn" onClick={() => doAction(m.id, "disable")}>Disable</button>
                <button className="btn btn-danger" onClick={() => doAction(m.id, "delete")}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
