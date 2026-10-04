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
const emptyCertification = { title: "", issuer: "", date: "", url: "", order: 0 };

export default function AdminDashboard({ about, projects, socials, certifications, onRefresh, onLogout }) {
  const [tab, setTab] = useState("projects");

  return (
    <div>
      <h2>Captain's Quarters</h2>
      <div className="link-row" style={{ marginBottom: "1.2rem", flexWrap: "wrap" }}>
        <button className={tab === "projects" ? "brass-btn" : "ghost-btn"} onClick={() => setTab("projects")}>
          Projects
        </button>
        <button className={tab === "socials" ? "brass-btn" : "ghost-btn"} onClick={() => setTab("socials")}>
          Connect
        </button>
        <button className={tab === "certifications" ? "brass-btn" : "ghost-btn"} onClick={() => setTab("certifications")}>
          Certifications
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
      {tab === "certifications" && (
        <CertificationsTab certifications={certifications} onRefresh={onRefresh} />
      )}
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
    setError("");
    try {
      await client.delete(`/projects/${id}`);
      onRefresh();
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
    }
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
    setError("");
    try {
      await client.delete(`/socials/${id}`);
      onRefresh();
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
    }
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

function CertificationsTab({ certifications, onRefresh }) {
  const [form, setForm] = useState(emptyCertification);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  function startEdit(c) {
    setEditingId(c._id);
    setForm(c);
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyCertification);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const payload = { ...form, order: Number(form.order) || 0 };
    try {
      if (editingId) {
        await client.put(`/certifications/${editingId}`, payload);
      } else {
        await client.post("/certifications", payload);
      }
      resetForm();
      onRefresh();
    } catch (err) {
      setError(err.response?.data?.message || "Save failed");
    }
  }

  async function handleDelete(id) {
    if (!confirm("Remove this certification?")) return;
    setError("");
    try {
      await client.delete(`/certifications/${id}`);
      onRefresh();
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="admin-form-row">
          <label>Title</label>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        </div>
        <div className="admin-form-row">
          <label>Issuer</label>
          <input value={form.issuer} onChange={(e) => setForm({ ...form, issuer: e.target.value })} />
        </div>
        <div className="admin-form-row">
          <label>Date</label>
          <input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="2025" />
        </div>
        <div className="admin-form-row">
          <label>Credential URL</label>
          <input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
        </div>
        <div className="admin-form-row">
          <label>Order</label>
          <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} />
        </div>
        {error && <p className="error-text">{error}</p>}
        <div className="link-row">
          <button type="submit" className="brass-btn">
            {editingId ? "Update" : "Add certification"}
          </button>
          {editingId && (
            <button type="button" className="ghost-btn" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div style={{ marginTop: "1.6rem" }}>
        {certifications.map((c) => (
          <div className="admin-item-row" key={c._id}>
            <span>{c.title}</span>
            <span className="link-row">
              <button className="ghost-btn" onClick={() => startEdit(c)}>
                Edit
              </button>
              <button className="ghost-btn" onClick={() => handleDelete(c._id)}>
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
