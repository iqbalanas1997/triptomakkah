import { useState, useEffect } from 'react';
import { X, Upload, Loader } from 'lucide-react';

const PackageForm = ({ package: pkg, onClose, onSuccess }) => {
  const isEdit = !!pkg;
  
  const [formData, setFormData] = useState({
    category: pkg?.category || '3-star',
    packageTitle: pkg?.packageTitle || '',
    hotelMakkah: pkg?.hotelMakkah || '',
    hotelMakkahDistance: pkg?.hotelMakkahDistance || '',
    hotelMadinah: pkg?.hotelMadinah || '',
    hotelMadinahDistance: pkg?.hotelMadinahDistance || '',
    nightsMakkah: pkg?.nightsMakkah || 0,
    nightsMadinah: pkg?.nightsMadinah || 0,
    transportType: pkg?.transportType || '',
    price: pkg?.price || '',
    currency: pkg?.currency || 'GBP',
    duration: pkg?.duration || '',
    inclusions: pkg?.inclusions || [],
    exclusions: pkg?.exclusions || [],
    badge: pkg?.badge || '',
    featured: pkg?.featured || false,
    imageUrl: pkg?.imageUrl || ''
  });

  const [inclusionInput, setInclusionInput] = useState('');
  const [exclusionInput, setExclusionInput] = useState('');
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(formData.imageUrl);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (pkg) {
      setImagePreview(pkg.imageUrl);
    }
  }, [pkg]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setErrors(prev => ({ ...prev, image: 'Only JPEG, PNG, and WebP images are allowed' }));
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, image: 'Image size must be less than 5MB' }));
      return;
    }

    try {
      setUploading(true);
      
      // Convert file to base64 for Vercel serverless function compatibility
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64Image = reader.result;
          
          const response = await fetch('/api/upload-image', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              image: base64Image,
              filename: file.name,
              fileType: file.type
            })
          });

          // Check if response is JSON
          const contentType = response.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            console.error('Non-JSON response:', text.substring(0, 200));
            throw new Error('Server returned invalid response. Please check API configuration.');
          }

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Upload failed' }));
            throw new Error(errorData.error || 'Upload failed');
          }

          const data = await response.json();
          setFormData(prev => ({ ...prev, imageUrl: data.imageUrl }));
          setImagePreview(data.imageUrl);
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.image;
            return newErrors;
          });
        } catch (error) {
          console.error('Error uploading image:', error);
          setErrors(prev => ({ ...prev, image: error.message || 'Failed to upload image' }));
        } finally {
          setUploading(false);
        }
      };
      
      reader.onerror = () => {
        setErrors(prev => ({ ...prev, image: 'Failed to read image file' }));
        setUploading(false);
      };
      
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      setErrors(prev => ({ ...prev, image: 'Failed to upload image' }));
      setUploading(false);
    }
  };

  const addInclusion = () => {
    if (inclusionInput.trim()) {
      setFormData(prev => ({
        ...prev,
        inclusions: [...prev.inclusions, inclusionInput.trim()]
      }));
      setInclusionInput('');
    }
  };

  const removeInclusion = (index) => {
    setFormData(prev => ({
      ...prev,
      inclusions: prev.inclusions.filter((_, i) => i !== index)
    }));
  };

  const addExclusion = () => {
    if (exclusionInput.trim()) {
      setFormData(prev => ({
        ...prev,
        exclusions: [...prev.exclusions, exclusionInput.trim()]
      }));
      setExclusionInput('');
    }
  };

  const removeExclusion = (index) => {
    setFormData(prev => ({
      ...prev,
      exclusions: prev.exclusions.filter((_, i) => i !== index)
    }));
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.packageTitle.trim()) newErrors.packageTitle = 'Package title is required';
    if (!formData.hotelMakkah.trim()) newErrors.hotelMakkah = 'Hotel Makkah is required';
    if (!formData.hotelMadinah.trim()) newErrors.hotelMadinah = 'Hotel Madinah is required';
    if (formData.nightsMakkah <= 0) newErrors.nightsMakkah = 'Nights in Makkah must be greater than 0';
    if (formData.nightsMadinah <= 0) newErrors.nightsMadinah = 'Nights in Madinah must be greater than 0';
    if (!formData.price.trim()) newErrors.price = 'Price is required';
    if (!formData.duration.trim()) newErrors.duration = 'Duration is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    try {
      setSubmitting(true);
      
      const url = isEdit 
        ? `/api/packages/${pkg.packageId}`
        : '/api/packages';
      
      const method = isEdit ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          packageId: isEdit ? pkg.packageId : undefined
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save package');
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving package:', error);
      setErrors({ submit: error.message || 'Failed to save package' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEdit ? 'Edit Package' : 'Add New Package'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Package Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            >
              <option value="3-star">3 Star</option>
              <option value="4-star">4 Star</option>
              <option value="5-star">5 Star</option>
              <option value="ramadan">Ramadan</option>
            </select>
          </div>

          {/* Package Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Package Title *
            </label>
            <input
              type="text"
              name="packageTitle"
              value={formData.packageTitle}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.packageTitle ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., 5 Star 10 Days Umrah Package"
              required
            />
            {errors.packageTitle && (
              <p className="mt-1 text-sm text-red-600">{errors.packageTitle}</p>
            )}
          </div>

          {/* Hotels Row */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Hotel Makkah *
              </label>
              <input
                type="text"
                name="hotelMakkah"
                value={formData.hotelMakkah}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.hotelMakkah ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.hotelMakkah && (
                <p className="mt-1 text-sm text-red-600">{errors.hotelMakkah}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Hotel Madinah *
              </label>
              <input
                type="text"
                name="hotelMadinah"
                value={formData.hotelMadinah}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.hotelMadinah ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.hotelMadinah && (
                <p className="mt-1 text-sm text-red-600">{errors.hotelMadinah}</p>
              )}
            </div>
          </div>

          {/* Nights Row */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nights in Makkah *
              </label>
              <input
                type="number"
                name="nightsMakkah"
                value={formData.nightsMakkah}
                onChange={handleChange}
                min="1"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.nightsMakkah ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.nightsMakkah && (
                <p className="mt-1 text-sm text-red-600">{errors.nightsMakkah}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nights in Madinah *
              </label>
              <input
                type="number"
                name="nightsMadinah"
                value={formData.nightsMadinah}
                onChange={handleChange}
                min="1"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.nightsMadinah ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.nightsMadinah && (
                <p className="mt-1 text-sm text-red-600">{errors.nightsMadinah}</p>
              )}
            </div>
          </div>

          {/* Transport Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Transport Type
            </label>
            <input
              type="text"
              name="transportType"
              value={formData.transportType}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g., Fully Insured Transfers"
            />
          </div>

          {/* Price and Currency Row */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price *
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.price ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., £349"
                required
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Currency
              </label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="GBP">GBP</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Duration *
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.duration ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., 7 Days"
              required
            />
            {errors.duration && (
              <p className="mt-1 text-sm text-red-600">{errors.duration}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Package Image
            </label>
            <div className="space-y-4">
              {imagePreview && (
                <div className="relative w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploading}
                />
                <div className="flex items-center space-x-2">
                  {uploading ? (
                    <>
                      <Loader className="animate-spin text-primary-600" size={20} />
                      <span className="text-gray-600">Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload size={20} className="text-gray-600" />
                      <span className="text-gray-600">Upload Image</span>
                    </>
                  )}
                </div>
              </label>
              {errors.image && (
                <p className="text-sm text-red-600">{errors.image}</p>
              )}
            </div>
          </div>

          {/* Inclusions */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Inclusions
            </label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={inclusionInput}
                onChange={(e) => setInclusionInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInclusion())}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Add inclusion item"
              />
              <button
                type="button"
                onClick={addInclusion}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.inclusions.map((item, index) => (
                <span
                  key={index}
                  className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => removeInclusion(index)}
                    className="text-primary-700 hover:text-primary-900"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Exclusions */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Exclusions
            </label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={exclusionInput}
                onChange={(e) => setExclusionInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addExclusion())}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Add exclusion item"
              />
              <button
                type="button"
                onClick={addExclusion}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.exclusions.map((item, index) => (
                <span
                  key={index}
                  className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => removeExclusion(index)}
                    className="text-red-700 hover:text-red-900"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Badge */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Badge (Optional)
            </label>
            <input
              type="text"
              name="badge"
              value={formData.badge}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g., Save your Booking with Minimum Deposit Today!"
            />
          </div>

          {/* Featured */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="featured"
              id="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="featured" className="text-sm font-semibold text-gray-700">
              Mark as Featured Package
            </label>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {errors.submit}
            </div>
          )}

          {/* Form Actions */}
          <div className="flex space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Saving...' : isEdit ? 'Update Package' : 'Add Package'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PackageForm;

