import { useState } from "react";
import client from "../api/client.js";

const emptyProject = {
  title: "",
  tagline: "",
  description: "",
  tech: "",
  githubUrl: "",
  liveUrl: "",
  order: 0
};

const emptySocial = { platform: "", url: "", order: 0 };

export default function AdminDashboard({ about, projects, socials, onRefresh, onLogout }) {
  const [tab, setTab] = useState("projects");

  return (
    <div>
      <h2>Captain's Quarters</h2>
      <div className="link-row" style={{ marginBottom: "1.2rem" }}>
        <button className={tab === "projects" ? "brass-btn" : "ghost-btn"} onClick={() => setTab("projects")}>
          Projects
        </button>
        <button className={tab === "socials" ? "brass-btn" : "ghost-btn"} onClick={() => setTab("socials")}>
          Socials
        </button>
        <button className={tab === "about" ? "brass-btn" : "ghost-btn"} onClick={() => setTab("about")}>
          About
        </button>
        <button className="ghost-btn" onClick={onLogout} style={{ marginLeft: "auto" }}>
          Log out
        </button>
      </div>

      {tab === "projects" && <ProjectsTab projects={projects} onRefresh={onRefresh} />}
      {tab === "socials" && <SocialsTab socials={socials} onRefresh={onRefresh} />}
      {tab === "about" && <AboutTab about={about} onRefresh={onRefresh} />}
    </div>
  );
}

function ProjectsTab({ projects, onRefresh }) {
  const [form, setForm] = useState(emptyProject);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  function startEdit(p) {
    setEditingId(p._id);
    setForm({ ...p, tech: (p.tech || []).join(", ") });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyProject);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const payload = {
      ...form,
      order: Number(form.order) || 0,
      tech: form.tech.split(",").map((t) => t.trim()).filter(Boolean)
    };
    try {
      if (editingId) {
        await client.put(`/projects/${editingId}`, payload);
      } else {
        await client.post("/projects", payload);
      }
      resetForm();
      onRefresh();
    } catch (err) {
      setError(err.response?.data?.message || "Save failed");
    }
  }

  async function handleDelete(id) {
    if (!confirm("Sink this project island? This can't be undone.")) return;
    await client.delete(`/projects/${id}`);
    onRefresh();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="admin-form-row">
          <label>Title</label>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>
        <div className="admin-form-row">
          <label>Tagline</label>
          <input value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
        </div>
        <div className="admin-form-row">
          <label>Description</label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
        </div>
        <div className="admin-form-row">
          <label>Tech (comma-separated)</label>
          <input value={form.tech} onChange={(e) => setForm({ ...form, tech: e.target.value })} />
        </div>
        <div className="admin-form-row">
          <label>GitHub URL</label>
          <input value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} />
        </div>
        <div className="admin-form-row">
          <label>Live URL</label>
          <input value={form.liveUrl} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} />
        </div>
        <div className="admin-form-row">
          <label>Order (position along the voyage)</label>
          <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} />
        </div>
        {error && <p className="error-text">{error}</p>}
        <div className="link-row">
          <button type="submit" className="brass-btn">
            {editingId ? "Update island" : "Add island"}
          </button>
          {editingId && (
            <button type="button" className="ghost-btn" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div style={{ marginTop: "1.6rem" }}>
        {projects.map((p) => (
          <div className="admin-item-row" key={p._id}>
            <span>{p.title}</span>
            <span className="link-row">
              <button className="ghost-btn" onClick={() => startEdit(p)}>
                Edit
              </button>
              <button className="ghost-btn" onClick={() => handleDelete(p._id)}>
                Delete
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SocialsTab({ socials, onRefresh }) {
  const [form, setForm] = useState(emptySocial);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  function startEdit(s) {
    setEditingId(s._id);
    setForm(s);
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptySocial);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const payload = { ...form, order: Number(form.order) || 0 };
    try {
      if (editingId) {
        await client.put(`/socials/${editingId}`, payload);
      } else {
        await client.post("/socials", payload);
      }
      resetForm();
      onRefresh();
    } catch (err) {
      setError(err.response?.data?.message || "Save failed");
    }
  }

  async function handleDelete(id) {
    if (!confirm("Remove this signal?")) return;
    await client.delete(`/socials/${id}`);
    onRefresh();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="admin-form-row">
          <label>Platform</label>
          <input
            value={form.platform}
            onChange={(e) => setForm({ ...form, platform: e.target.value })}
            required
            placeholder="GitHub, LinkedIn, Email…"
          />
        </div>
        <div className="admin-form-row">
          <label>URL</label>
          <input
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            required
          />
        </div>
        <div className="admin-form-row">
          <label>Order</label>
          <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} />
        </div>
        {error && <p className="error-text">{error}</p>}
        <div className="link-row">
          <button type="submit" className="brass-btn">
            {editingId ? "Update signal" : "Add signal"}
          </button>
          {editingId && (
            <button type="button" className="ghost-btn" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div style={{ marginTop: "1.6rem" }}>
        {socials.map((s) => (
          <div className="admin-item-row" key={s._id}>
            <span>{s.platform}</span>
            <span className="link-row">
              <button className="ghost-btn" onClick={() => startEdit(s)}>
                Edit
              </button>
              <button className="ghost-btn" onClick={() => handleDelete(s._id)}>
                Delete
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutTab({ about, onRefresh }) {
  const [form, setForm] = useState({
    name: about?.name || "",
    tagline: about?.tagline || "",
    bio: about?.bio || "",
    education: about?.education || "",
    skills: (about?.skills || []).join(", "),
    resumeUrl: about?.resumeUrl || ""
  });
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaved(false);
    try {
      await client.put("/about", {
        ...form,
        skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean)
      });
      setSaved(true);
      onRefresh();
    } catch (err) {
      setError(err.response?.data?.message || "Save failed");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="admin-form-row">
        <label>Name</label>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </div>
      <div className="admin-form-row">
        <label>Tagline</label>
        <input value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
      </div>
      <div className="admin-form-row">
        <label>Bio</label>
        <textarea rows={4} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
      </div>
      <div className="admin-form-row">
        <label>Education</label>
        <input value={form.education} onChange={(e) => setForm({ ...form, education: e.target.value })} />
      </div>
      <div className="admin-form-row">
        <label>Skills (comma-separated)</label>
        <input value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} />
      </div>
      <div className="admin-form-row">
        <label>Resume URL</label>
        <input value={form.resumeUrl} onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })} />
      </div>
      {error && <p className="error-text">{error}</p>}
      {saved && <p style={{ color: "#2a7" }}>Saved.</p>}
      <button type="submit" className="brass-btn">
        Save
      </button>
    </form>
  );
}
