import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Package, Loader } from 'lucide-react';
import PackageForm from './PackageForm';
import DeleteConfirmModal from './DeleteConfirmModal';
import Toast from './Toast';

const AdminDashboard = () => {
  const [packages, setPackages] = useState({
    threeStarPackages: [],
    fourStarPackages: [],
    fiveStarPackages: [],
    ramadanPackages: []
  });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [deletePackage, setDeletePackage] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const categoryLabels = {
    threeStarPackages: '3 Star',
    fourStarPackages: '4 Star',
    fiveStarPackages: '5 Star',
    ramadanPackages: 'Ramadan'
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/packages');
      if (!response.ok) throw new Error('Failed to fetch packages');
      const data = await response.json();
      setPackages(data);
    } catch (error) {
      console.error('Error fetching packages:', error);
      showToast('Failed to load packages', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingPackage(null);
    setShowForm(true);
  };

  const handleEdit = (pkg) => {
    setEditingPackage(pkg);
    setShowForm(true);
  };

  const handleDelete = (pkg) => {
    setDeletePackage(pkg);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`/api/packages/${deletePackage.packageId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Failed to delete package');
      
      showToast('Package deleted successfully', 'success');
      setDeletePackage(null);
      fetchPackages();
    } catch (error) {
      console.error('Error deleting package:', error);
      showToast('Failed to delete package', 'error');
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingPackage(null);
  };

  const handleFormSuccess = () => {
    showToast(editingPackage ? 'Package updated successfully' : 'Package added successfully', 'success');
    setShowForm(false);
    setEditingPackage(null);
    fetchPackages();
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin text-primary-600 mx-auto mb-4" size={48} />
          <p className="text-gray-600">Loading packages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage Umrah Packages</p>
            </div>
            <button
              onClick={handleAdd}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Add Package</span>
            </button>
          </div>
        </div>

        {/* Packages by Category */}
        {Object.entries(categoryLabels).map(([key, label]) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center space-x-2 mb-6">
              <Package className="text-primary-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-900">{label} Packages</h2>
              <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">
                {packages[key]?.length || 0}
              </span>
            </div>

            {packages[key]?.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
                <p className="text-gray-500">No packages in this category</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages[key].map((pkg) => (
                  <motion.div
                    key={pkg.packageId}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {/* Package Image */}
                    {pkg.imageUrl && (
                      <div className="h-48 overflow-hidden bg-gray-200">
                        <img
                          src={pkg.imageUrl}
                          alt={pkg.packageTitle}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}

                    <div className="p-6">
                      {/* Package Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                        {pkg.packageTitle}
                      </h3>

                      {/* Package Details */}
                      <div className="space-y-2 mb-4 text-sm text-gray-600">
                        <div>
                          <strong>Duration:</strong> {pkg.duration}
                        </div>
                        <div>
                          <strong>Price:</strong> {pkg.price} {pkg.currency}
                        </div>
                        <div>
                          <strong>Hotels:</strong> {pkg.hotelMakkah} / {pkg.hotelMadinah}
                        </div>
                        <div>
                          <strong>Nights:</strong> {pkg.nightsMakkah} Makkah, {pkg.nightsMadinah} Madinah
                        </div>
                        {pkg.badge && (
                          <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs mt-2">
                            {pkg.badge}
                          </div>
                        )}
                        {pkg.featured && (
                          <div className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs mt-2 inline-block">
                            Featured
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(pkg)}
                          className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                        >
                          <Edit size={16} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(pkg)}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                        >
                          <Trash2 size={16} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Package Form Modal */}
      {showForm && (
        <PackageForm
          package={editingPackage}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deletePackage && (
        <DeleteConfirmModal
          package={deletePackage}
          onConfirm={confirmDelete}
          onCancel={() => setDeletePackage(null)}
        />
      )}

      {/* Toast Notification */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: '', type: 'success' })}
        />
      )}
    </div>
  );
};

export default AdminDashboard;

