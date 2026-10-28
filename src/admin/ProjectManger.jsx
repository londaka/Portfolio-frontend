import React, { useCallback, useEffect, useState } from 'react'
import api from '../api/axios.js'


const emptyForm = {
    title: '',
    description: '',
    technologies: '',
    image: '',
    githubUrl: '',
    liveUrl: '',
    featured: false,
    published: false,
    order: 0
}



const ProjectManger = () => {

    const [projects, setProjects] = useState([])
    const [form, setForm] = useState(emptyForm)
    const [editingId, setEditingId] = useState(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [notice, setNotice] = useState('')
    const [imagePreviewError, setImagePreviewError] = useState(false)

    const loadProjects = useCallback(async() => {
        setLoading(true)
        setError('')

        try {
            const { data } = await api.get('/admin')
            setProjects(Array.isArray(data) ? data : data.projects ?? [])
        } catch (error) {
            setError(error.response?.data?.message || 'Could not load projects')
        }finally{
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        loadProjects()
    }, [loadProjects])

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target
        if (name === 'image') setImagePreviewError(false)
        setForm((currentForm) => ({
            ...currentForm,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const resetForm = () => {
        setForm(emptyForm)
        setEditingId(null)
        setError('')
        setNotice('')
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setSaving(true)
        setError('')
        setNotice('')

        const projectData = {
            ...form,
            technologies: form.technologies.split(',').map((technology) => technology.trim()).filter(Boolean),
            order: Number(form.order) || 0
        }

        try {
            if (editingId) {
                await api.put(`/admin/${editingId}`, projectData)
                setNotice('Project updated.')
            } else {
                await api.post('/admin/add', projectData)
                setNotice('Project created.')
            }
            resetForm()
            await loadProjects()
        } catch (error) {
            setError(error.response?.data?.message || 'Could not save project')
        } finally {
            setSaving(false)
        }
    }

    const handleEdit = (project) => {
        setEditingId(project._id)
        setForm({
            title: project.title || '',
            description: project.description || '',
            technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : '',
            image: project.image || '',
            githubUrl: project.githubUrl || '',
            liveUrl: project.liveUrl || '',
            featured: Boolean(project.featured),
            published: Boolean(project.published),
            order: project.order ?? 0
        })
        setError('')
        setNotice('')
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleDelete = async (projectId) => {
        setError('')
        setNotice('')

        try {
            await api.delete(`/admin/${projectId}`)
            setNotice('Project deleted.')
            if (editingId === projectId) resetForm()
            await loadProjects()
        } catch (error) {
            setError(error.response?.data?.message || 'Could not delete project')
        }
    }

    const inputClass = 'mt-2 w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-400'
    const labelClass = 'block text-sm text-slate-300'

  return (
    <section className="px-4 py-10 text-white sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold">Project manager</h1>
        <p className="mt-2 text-slate-400">Create, edit, and publish portfolio projects.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-semibold">{editingId ? 'Edit project' : 'Add a project'}</h2>
          <div className="grid gap-5 md:grid-cols-2">
            <label className={labelClass}>
              Title
              <input className={inputClass} name="title" value={form.title} onChange={handleChange} required />
            </label>
            <label className={labelClass}>
              Technologies (comma-separated)
              <input className={inputClass} name="technologies" value={form.technologies} onChange={handleChange} placeholder="React, Node.js, MongoDB" required />
            </label>
            <label className={`${labelClass} md:col-span-2`}>
              Description
              <textarea className={inputClass} name="description" value={form.description} onChange={handleChange} rows="4" required />
            </label>
            <label className={labelClass}>
              Image URL
              <input className={inputClass} name="image" type="url" value={form.image} onChange={handleChange} />
            </label>
            {form.image && (
              <div className="md:col-span-2">
                {imagePreviewError ? (
                  <p role="status" className="text-sm text-amber-300">
                    Image preview failed. Use a publicly accessible, direct image URL.
                  </p>
                ) : (
                  <img
                    src={form.image}
                    alt="Project image preview"
                    onError={() => setImagePreviewError(true)}
                    className="h-48 w-full rounded-lg border border-white/10 object-cover sm:max-w-md"
                  />
                )}
              </div>
            )}
            <label className={labelClass}>
              GitHub URL
              <input className={inputClass} name="githubUrl" type="url" value={form.githubUrl} onChange={handleChange} />
            </label>
            <label className={labelClass}>
              Live project URL
              <input className={inputClass} name="liveUrl" type="url" value={form.liveUrl} onChange={handleChange} />
            </label>
            <label className={labelClass}>
              Display order
              <input className={inputClass} name="order" type="number" value={form.order} onChange={handleChange} />
            </label>
          </div>

          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm text-slate-300">
              <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-300">
              <input type="checkbox" name="published" checked={form.published} onChange={handleChange} />
              Published
            </label>
          </div>

          {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
          {notice && <p role="status" className="text-sm text-emerald-400">{notice}</p>}

          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500 disabled:opacity-50">
              {saving ? 'Saving...' : editingId ? 'Save changes' : 'Create project'}
            </button>
            {editingId && <button type="button" onClick={resetForm} className="rounded-lg border border-white/15 px-5 py-3 hover:border-white/40">Cancel</button>}
          </div>
        </form>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Projects</h2>
          {loading ? <p className="mt-4 text-slate-400">Loading projects...</p> : projects.length === 0 ? <p className="mt-4 text-slate-400">No projects yet.</p> : (
            <ul className="mt-4 space-y-3">
              {projects.map((project) => (
                <li key={project._id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <div>
                    <h3 className="font-medium">{project.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">
                      {project.published ? 'Published' : 'Draft'}{project.featured ? ' · Featured' : ''}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => handleEdit(project)} className="rounded-lg border border-white/15 px-4 py-2 text-sm hover:border-blue-400">Edit</button>
                    <button type="button" onClick={() => handleDelete(project._id)} className="rounded-lg border border-red-400/30 px-4 py-2 text-sm text-red-300 hover:bg-red-400/10">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </section>
  )
}

export default ProjectManger