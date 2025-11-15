"use client";
import React, { useState } from 'react';

import {
    Plus,
    Upload,
    YoutubeLogo,
    Link,
    Tag,
    CurrencyDollar,
    Globe,
    Lock,
    Calendar,
    Clock,
    Play,
    X,
    CaretDown,
    Check,
    Pencil,
    Trash,
    FileText,
    VideoCamera,
    Question,
    CaretUp
} from "phosphor-react";

// Aliases (keep your old Fa* names)
export const FaPlus = Plus;
export const FaUpload = Upload;
export const FaYoutube = YoutubeLogo;
export const FaLink = Link;
export const FaTag = Tag;
export const FaDollarSign = CurrencyDollar;
export const FaGlobe = Globe;
export const FaLock = Lock;
export const FaCalendar = Calendar;
export const FaClock = Clock;
export const FaPlay = Play;
export const FaTimes = X;
export const FaChevronDown = CaretDown; // replaced
export const FaCheck = Check;
export const FaEdit = Pencil;
export const FaTrash = Trash;
export const FaFileText = FileText;
export const FaVideo = VideoCamera;
export const FaQuestionCircle = Question;
export const FaArrowUp = CaretUp;   // replaced
export const FaArrowDown = CaretDown; // replaced



const CreateTutorial = ({ setActiveTab }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        difficulty: 'beginner',
        price: 0,
        visibility: 'public',
        thumbnail: null,
        estimatedDuration: '',
        tags: [],
        lessons: [],
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState({});
    const [newTag, setNewTag] = useState('');

    const categories = [
        'Web Development',
        'Mobile Development',
        'Data Science',
        'Cloud Computing',
        'DevOps',
        'UI/UX Design',
        'Cyber Security',
        'Machine Learning'
    ];

    const difficulties = [
        { value: 'beginner', label: 'Beginner', color: 'bg-green-500' },
        { value: 'intermediate', label: 'Intermediate', color: 'bg-yellow-500' },
        { value: 'advanced', label: 'Advanced', color: 'bg-red-500' }
    ];

    const validateStep = (step) => {
        const newErrors = {};

        if (step === 1) {
            if (!formData.title.trim()) newErrors.title = 'Title is required';
            if (!formData.description.trim()) newErrors.description = 'Description is required';
            if (!formData.category) newErrors.category = 'Category is required';
            if (formData.lessons.length === 0) newErrors.lessons = 'At least one lesson is required';
        }

        if (step === 2) {
            if (!formData.thumbnail) newErrors.thumbnail = 'Thumbnail is required';
            if (!formData.estimatedDuration) newErrors.estimatedDuration = 'Estimated duration is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const addTag = () => {
        if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, newTag.trim()]
            }));
            setNewTag('');
        }
    };

    const removeTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleThumbnailUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setErrors(prev => ({ ...prev, thumbnail: 'Please upload an image file' }));
                return;
            }
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                setErrors(prev => ({ ...prev, thumbnail: 'Image size should be less than 5MB' }));
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                setFormData(prev => ({
                    ...prev,
                    thumbnail: e.target.result
                }));
                setErrors(prev => ({ ...prev, thumbnail: '' }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Lesson Management
    const addLesson = (type) => {
        const newLesson = {
            id: Date.now().toString(),
            type,
            title: '',
            content: '',
            order: formData.lessons.length + 1,
            duration: type === 'video' ? '' : '5 min', // Default for text lessons
            quizzes: []
        };

        setFormData(prev => ({
            ...prev,
            lessons: [...prev.lessons, newLesson]
        }));
    };

    const updateLesson = (lessonId, field, value) => {
        setFormData(prev => ({
            ...prev,
            lessons: prev.lessons.map(lesson =>
                lesson.id === lessonId ? { ...lesson, [field]: value } : lesson
            )
        }));
    };

    const deleteLesson = (lessonId) => {
        setFormData(prev => ({
            ...prev,
            lessons: prev.lessons.filter(lesson => lesson.id !== lessonId)
        }));
    };

    const moveLesson = (lessonId, direction) => {
        const lessons = [...formData.lessons];
        const index = lessons.findIndex(lesson => lesson.id === lessonId);

        if ((direction === 'up' && index === 0) || (direction === 'down' && index === lessons.length - 1)) {
            return;
        }

        const newIndex = direction === 'up' ? index - 1 : index + 1;
        [lessons[index], lessons[newIndex]] = [lessons[newIndex], lessons[index]];

        // Update order numbers
        lessons.forEach((lesson, idx) => {
            lesson.order = idx + 1;
        });

        setFormData(prev => ({ ...prev, lessons }));
    };

    // Quiz Management
    const addQuiz = (lessonId) => {
        const newQuiz = {
            id: Date.now().toString(),
            question: '',
            options: ['', '', '', ''],
            correctAnswer: 0,
            explanation: ''
        };

        setFormData(prev => ({
            ...prev,
            lessons: prev.lessons.map(lesson =>
                lesson.id === lessonId
                    ? { ...lesson, quizzes: [...lesson.quizzes, newQuiz] }
                    : lesson
            )
        }));
    };

    const updateQuiz = (lessonId, quizId, field, value) => {
        setFormData(prev => ({
            ...prev,
            lessons: prev.lessons.map(lesson =>
                lesson.id === lessonId
                    ? {
                        ...lesson,
                        quizzes: lesson.quizzes.map(quiz =>
                            quiz.id === quizId ? { ...quiz, [field]: value } : quiz
                        )
                    }
                    : lesson
            )
        }));
    };

    const deleteQuiz = (lessonId, quizId) => {
        setFormData(prev => ({
            ...prev,
            lessons: prev.lessons.map(lesson =>
                lesson.id === lessonId
                    ? { ...lesson, quizzes: lesson.quizzes.filter(quiz => quiz.id !== quizId) }
                    : lesson
            )
        }));
    };

    const steps = [
        { number: 1, title: 'Basic Info', description: 'Title & lessons' },
        { number: 2, title: 'Media', description: 'Thumbnail & settings' },
        { number: 3, title: 'Review', description: 'Final check' }
    ];

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Tutorial Title *</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                placeholder="e.g., Complete React Masterclass - From Beginner to Advanced"
                                className={`w-full px-4 py-3 bg-[var(--card-bg)] border rounded-xl focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all ${errors.title ? 'border-red-500' : 'border-[var(--border-color)]'
                                    }`}
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Description *</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                rows={4}
                                placeholder="Describe what students will learn in this tutorial..."
                                className={`w-full px-4 py-3 bg-[var(--card-bg)] border rounded-xl focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all resize-none ${errors.description ? 'border-red-500' : 'border-[var(--border-color)]'
                                    }`}
                            />
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Category *</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => handleInputChange('category', e.target.value)}
                                    className={`w-full px-4 py-3 bg-[var(--card-bg)] border rounded-xl focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all ${errors.category ? 'border-red-500' : 'border-[var(--border-color)]'
                                        }`}
                                >
                                    <option value="">Select a category</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Difficulty Level</label>
                                <div className="flex gap-2">
                                    {difficulties.map((diff) => (
                                        <button
                                            key={diff.value}
                                            type="button"
                                            onClick={() => handleInputChange('difficulty', diff.value)}
                                            className={`flex-1 px-4 py-3 rounded-xl border transition-all ${formData.difficulty === diff.value
                                                    ? `${diff.color} text-white border-transparent`
                                                    : 'bg-[var(--card-bg)] border-[var(--border-color)] hover:border-[var(--accent)]'
                                                }`}
                                        >
                                            {diff.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Lessons Section */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <label className="block text-sm font-medium">Lessons *</label>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => addLesson('text')}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                    >
                                        <FaFileText />
                                        Add Text Lesson
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => addLesson('video')}
                                        className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                                    >
                                        <FaVideo />
                                        Add Video Lesson
                                    </button>
                                </div>
                            </div>

                            {errors.lessons && <p className="text-red-500 text-sm mb-4">{errors.lessons}</p>}

                            <div className="space-y-4">
                                {formData.lessons.map((lesson, index) => (
                                    <LessonCard
                                        key={lesson.id}
                                        lesson={lesson}
                                        index={index}
                                        onUpdate={updateLesson}
                                        onDelete={deleteLesson}
                                        onMove={moveLesson}
                                        onAddQuiz={addQuiz}
                                        onUpdateQuiz={updateQuiz}
                                        onDeleteQuiz={deleteQuiz}
                                        totalLessons={formData.lessons.length}
                                    />
                                ))}
                            </div>

                            {formData.lessons.length === 0 && (
                                <div className="text-center py-8 border-2 border-dashed border-[var(--border-color)] rounded-xl">
                                    <FaFileText className="text-3xl text-[var(--accent)] mx-auto mb-3" />
                                    <p className="text-sm opacity-70">No lessons added yet. Start by adding your first lesson.</p>
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Thumbnail *</label>
                            {formData.thumbnail ? (
                                <div className="relative max-w-md">
                                    <img
                                        src={formData.thumbnail}
                                        alt="Thumbnail preview"
                                        className="w-full rounded-2xl border-2 border-[var(--border-color)]"
                                    />
                                    <button
                                        onClick={() => handleInputChange('thumbnail', null)}
                                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                            ) : (
                                <div
                                    onClick={() => document.getElementById('thumbnail-upload').click()}
                                    className={`max-w-md aspect-video border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors ${errors.thumbnail ? 'border-red-500' : 'border-[var(--border-color)] hover:border-[var(--accent)]'
                                        }`}
                                >
                                    <FaUpload className="text-2xl text-[var(--accent)] mb-2" />
                                    <p className="font-medium">Upload Thumbnail</p>
                                    <p className="text-sm opacity-60 mt-1">Recommended: 1280x720px • Max 5MB</p>
                                </div>
                            )}
                            <input
                                id="thumbnail-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleThumbnailUpload}
                                className="hidden"
                            />
                            {errors.thumbnail && <p className="text-red-500 text-sm mt-1">{errors.thumbnail}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Estimated Duration *</label>
                                <input
                                    type="text"
                                    value={formData.estimatedDuration}
                                    onChange={(e) => handleInputChange('estimatedDuration', e.target.value)}
                                    placeholder="e.g., 2 hours 30 minutes"
                                    className={`w-full px-4 py-3 bg-[var(--card-bg)] border rounded-xl focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all ${errors.estimatedDuration ? 'border-red-500' : 'border-[var(--border-color)]'
                                        }`}
                                />
                                {errors.estimatedDuration && <p className="text-red-500 text-sm mt-1">{errors.estimatedDuration}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Pricing</label>
                                <div className="relative">
                                    <FaDollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                                        placeholder="0.00"
                                        className="w-full pl-10 pr-4 py-3 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all"
                                    />
                                </div>
                                <p className="text-xs opacity-60 mt-2">Set to 0 for free tutorial</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Tags</label>
                            <div className="flex gap-2 mb-3">
                                <input
                                    type="text"
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                    placeholder="Add a tag..."
                                    className="flex-1 px-4 py-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={addTag}
                                    className="px-4 bg-[var(--accent)] text-white rounded-lg hover:opacity-90 transition-opacity"
                                >
                                    <FaPlus />
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent)] rounded-full text-sm"
                                    >
                                        <FaTag className="text-xs" />
                                        {tag}
                                        <button
                                            onClick={() => removeTag(tag)}
                                            className="hover:text-red-500 transition-colors"
                                        >
                                            <FaTimes className="text-xs" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Visibility</label>
                            <div className="flex gap-2">
                                {[
                                    { value: 'public', icon: FaGlobe, label: 'Public' },
                                    { value: 'private', icon: FaLock, label: 'Private' }
                                ].map((visibility) => {
                                    const Icon = visibility.icon;
                                    return (
                                        <button
                                            key={visibility.value}
                                            type="button"
                                            onClick={() => handleInputChange('visibility', visibility.value)}
                                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all ${formData.visibility === visibility.value
                                                    ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]'
                                                    : 'border-[var(--border-color)] bg-[var(--card-bg)] hover:border-[var(--accent)]/50'
                                                }`}
                                        >
                                            <Icon />
                                            {visibility.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-6">
                        <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                                    <FaCheck className="text-white text-xl" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-green-500">Ready to Publish!</h3>
                                    <p className="text-sm opacity-70">Review your tutorial details before publishing</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <h4 className="font-semibold text-lg">Tutorial Overview</h4>
                                <div className="space-y-4">
                                    <DetailItem label="Title" value={formData.title} />
                                    <DetailItem label="Description" value={formData.description} />
                                    <DetailItem label="Category" value={formData.category} />
                                    <DetailItem label="Difficulty" value={formData.difficulty} />
                                    <DetailItem label="Duration" value={formData.estimatedDuration} />
                                    <DetailItem label="Price" value={formData.price === 0 ? 'Free' : `$${formData.price}`} />
                                    <DetailItem label="Visibility" value={formData.visibility} />
                                </div>

                                {formData.tags.length > 0 && (
                                    <div>
                                        <h5 className="font-semibold mb-2">Tags</h5>
                                        <div className="flex flex-wrap gap-2">
                                            {formData.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent)] rounded-full text-sm"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-6">
                                <h4 className="font-semibold text-lg">Curriculum</h4>
                                <div className="space-y-3">
                                    {formData.lessons.map((lesson, index) => (
                                        <div key={lesson.id} className="flex items-center gap-3 p-3 bg-[var(--card-bg)] rounded-lg border border-[var(--border-color)]">
                                            <div className="w-8 h-8 bg-[var(--accent)] text-white rounded-full flex items-center justify-center text-sm font-medium">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium">{lesson.title || 'Untitled Lesson'}</p>
                                                <p className="text-xs opacity-60 capitalize">
                                                    {lesson.type} • {lesson.duration} • {lesson.quizzes.length} quizzes
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                    <div className="flex items-center gap-2 text-blue-500">
                                        <FaQuestionCircle />
                                        <span className="font-medium">Progression Rule</span>
                                    </div>
                                    <p className="text-sm mt-1 opacity-70">
                                        Students must complete all quizzes in a lesson before moving to the next one
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const handlePublish = () => {
        if (validateStep(currentStep)) {
            // Final validation - check if all lessons have content and quizzes are valid
            const lessonErrors = [];
            formData.lessons.forEach((lesson, index) => {
                if (!lesson.title.trim()) lessonErrors.push(`Lesson ${index + 1} title is required`);
                if (!lesson.content.trim()) lessonErrors.push(`Lesson ${index + 1} content is required`);
                lesson.quizzes.forEach((quiz, quizIndex) => {
                    if (!quiz.question.trim()) lessonErrors.push(`Quiz ${quizIndex + 1} in Lesson ${index + 1} needs a question`);
                    if (quiz.options.some(opt => !opt.trim())) lessonErrors.push(`All options must be filled for quiz in Lesson ${index + 1}`);
                });
            });

            if (lessonErrors.length > 0) {
                alert('Please fix the following errors:\n' + lessonErrors.join('\n'));
                return;
            }

            console.log('Publishing tutorial:', formData);
            setActiveTab('my_tutorials');
        }
    };

    return (
        <div className="p-6 lg:p-8 w-full h-full text-[var(--foreground)] overflow-y-auto">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
                <div className="flex-1">
                    <button
                        onClick={() => setActiveTab('my_tutorials')}
                        className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity mb-4"
                    >
                        ← Back to My Tutorials
                    </button>
                    <h1 className="text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-[var(--foreground)] to-[var(--accent)] bg-clip-text text-transparent">
                        Create New Tutorial
                    </h1>
                    <p className="text-sm opacity-70 mt-2">Build and share your knowledge with the world</p>
                </div>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
                <div className="flex justify-between items-center">
                    {steps.map((step, index) => (
                        <React.Fragment key={step.number}>
                            <div className="flex flex-col items-center flex-1">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${currentStep >= step.number
                                        ? 'bg-[var(--accent)] border-[var(--accent)] text-white'
                                        : 'border-[var(--border-color)] bg-[var(--card-bg)]'
                                    }`}>
                                    {currentStep > step.number ? <FaCheck /> : step.number}
                                </div>
                                <div className="mt-2 text-center">
                                    <p className={`text-sm font-medium ${currentStep >= step.number ? 'text-[var(--accent)]' : 'opacity-50'
                                        }`}>
                                        {step.title}
                                    </p>
                                    <p className="text-xs opacity-60 hidden sm:block">{step.description}</p>
                                </div>
                            </div>
                            {index < steps.length - 1 && (
                                <div className={`flex-1 h-1 mx-4 transition-colors ${currentStep > step.number ? 'bg-[var(--accent)]' : 'bg-[var(--border-color)]'
                                    }`} />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Form Container */}
            <div className="max-w-6xl mx-auto">
                <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl shadow-sm p-6 lg:p-8">
                    {renderStepContent()}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center mt-8 pt-6 border-t border-[var(--border-color)]">
                        <button
                            onClick={prevStep}
                            disabled={currentStep === 1}
                            className={`px-6 py-3 rounded-xl border transition-all ${currentStep === 1
                                    ? 'border-[var(--border-color)] text-opacity-50 cursor-not-allowed'
                                    : 'border-[var(--border-color)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
                                }`}
                        >
                            Previous
                        </button>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setActiveTab('my_tutorials')}
                                className="px-6 py-3 border border-[var(--border-color)] rounded-xl hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
                            >
                                Save as Draft
                            </button>

                            {currentStep < steps.length ? (
                                <button
                                    onClick={nextStep}
                                    className="px-6 py-3 bg-[var(--accent)] text-white rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
                                >
                                    Continue
                                    <FaChevronDown className="rotate-90" />
                                </button>
                            ) : (
                                <button
                                    onClick={handlePublish}
                                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
                                >
                                    <FaPlay className="rotate-180" />
                                    Publish Tutorial
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Lesson Card Component
const LessonCard = ({ lesson, index, onUpdate, onDelete, onMove, onAddQuiz, onUpdateQuiz, onDeleteQuiz, totalLessons }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="border border-[var(--border-color)] rounded-xl overflow-hidden">
            {/* Lesson Header */}
            <div className="bg-[var(--card-bg)] p-4 flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                    <div className="flex flex-col gap-1">
                        <button
                            onClick={() => onMove(lesson.id, 'up')}
                            disabled={index === 0}
                            className={`p-1 rounded ${index === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[var(--accent)]/10'
                                }`}
                        >
                            <FaArrowUp className="text-xs" />
                        </button>
                        <button
                            onClick={() => onMove(lesson.id, 'down')}
                            disabled={index === totalLessons - 1}
                            className={`p-1 rounded ${index === totalLessons - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[var(--accent)]/10'
                                }`}
                        >
                            <FaArrowDown className="text-xs" />
                        </button>
                    </div>

                    <div className="w-8 h-8 bg-[var(--accent)] text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                    </div>

                    <div className="flex-1">
                        <input
                            type="text"
                            value={lesson.title}
                            onChange={(e) => onUpdate(lesson.id, 'title', e.target.value)}
                            placeholder={`Lesson ${index + 1} Title`}
                            className="w-full bg-transparent font-medium focus:outline-none"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full capitalize ${lesson.type === 'video' ? 'bg-purple-500/20 text-purple-500' : 'bg-blue-500/20 text-blue-500'
                        }`}>
                        {lesson.type}
                    </span>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="p-2 hover:bg-[var(--accent)]/10 rounded-lg transition-colors"
                    >
                        <FaEdit />
                    </button>
                    <button
                        onClick={() => onDelete(lesson.id)}
                        className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors"
                    >
                        <FaTrash />
                    </button>
                </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="border-t border-[var(--border-color)] p-4 space-y-4">
                    {/* Lesson Content */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            {lesson.type === 'video' ? 'Video URL' : 'Content'} *
                        </label>
                        {lesson.type === 'video' ? (
                            <input
                                type="url"
                                value={lesson.content}
                                onChange={(e) => onUpdate(lesson.id, 'content', e.target.value)}
                                placeholder="https://www.youtube.com/watch?v=..."
                                className="w-full px-4 py-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all"
                            />
                        ) : (
                            <textarea
                                value={lesson.content}
                                onChange={(e) => onUpdate(lesson.id, 'content', e.target.value)}
                                rows={6}
                                placeholder="Write your lesson content here..."
                                className="w-full px-4 py-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all resize-none"
                            />
                        )}
                    </div>

                    {/* Duration */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Duration</label>
                            <input
                                type="text"
                                value={lesson.duration}
                                onChange={(e) => onUpdate(lesson.id, 'duration', e.target.value)}
                                placeholder="e.g., 15 min"
                                className="w-full px-4 py-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    {/* Quizzes Section */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <label className="block text-sm font-medium">Quizzes</label>
                            <button
                                onClick={() => onAddQuiz(lesson.id)}
                                className="flex items-center gap-2 px-3 py-1 bg-[var(--accent)] text-white rounded-lg hover:opacity-90 transition-opacity text-sm"
                            >
                                <FaPlus />
                                Add Quiz
                            </button>
                        </div>

                        <div className="space-y-3">
                            {lesson.quizzes.map((quiz, quizIndex) => (
                                <QuizCard
                                    key={quiz.id}
                                    quiz={quiz}
                                    quizIndex={quizIndex}
                                    lessonId={lesson.id}
                                    onUpdate={onUpdateQuiz}
                                    onDelete={onDeleteQuiz}
                                />
                            ))}
                        </div>

                        {lesson.quizzes.length === 0 && (
                            <div className="text-center py-4 border-2 border-dashed border-[var(--border-color)] rounded-lg">
                                <FaQuestionCircle className="text-xl text-[var(--accent)] mx-auto mb-2" />
                                <p className="text-sm opacity-70">No quizzes yet. Add quizzes to test student understanding.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

// Quiz Card Component
const QuizCard = ({ quiz, quizIndex, lessonId, onUpdate, onDelete }) => {
    return (
        <div className="border border-[var(--border-color)] rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium">Quiz {quizIndex + 1}</h4>
                <button
                    onClick={() => onDelete(lessonId, quiz.id)}
                    className="p-1 text-red-500 hover:bg-red-500/10 rounded transition-colors"
                >
                    <FaTrash className="text-sm" />
                </button>
            </div>

            <div className="space-y-3">
                <input
                    type="text"
                    value={quiz.question}
                    onChange={(e) => onUpdate(lessonId, quiz.id, 'question', e.target.value)}
                    placeholder="Enter your question..."
                    className="w-full px-3 py-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all"
                />

                <div className="space-y-2">
                    <label className="block text-sm font-medium">Options</label>
                    {quiz.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center gap-3">
                            <input
                                type="radio"
                                name={`correct-${quiz.id}`}
                                checked={quiz.correctAnswer === optionIndex}
                                onChange={() => onUpdate(lessonId, quiz.id, 'correctAnswer', optionIndex)}
                                className="text-[var(--accent)]"
                            />
                            <input
                                type="text"
                                value={option}
                                onChange={(e) => {
                                    const newOptions = [...quiz.options];
                                    newOptions[optionIndex] = e.target.value;
                                    onUpdate(lessonId, quiz.id, 'options', newOptions);
                                }}
                                placeholder={`Option ${optionIndex + 1}`}
                                className="flex-1 px-3 py-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all"
                            />
                        </div>
                    ))}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Explanation</label>
                    <textarea
                        value={quiz.explanation}
                        onChange={(e) => onUpdate(lessonId, quiz.id, 'explanation', e.target.value)}
                        rows={2}
                        placeholder="Explain why the correct answer is right..."
                        className="w-full px-3 py-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all resize-none"
                    />
                </div>
            </div>
        </div>
    );
};

const DetailItem = ({ label, value }) => (
    <div className="flex justify-between items-center py-2 border-b border-[var(--border-color)]/30">
        <span className="text-sm opacity-70">{label}:</span>
        <span className="font-medium text-right">{value || 'Not set'}</span>
    </div>
);

export default CreateTutorial;