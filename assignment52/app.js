const supabaseUrl = 'https://kerazyzofdhkkypiwpzw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlcmF6eXpvZmRoa2t5cGl3cHp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxMjAwMTMsImV4cCI6MjA2ODY5NjAxM30.aCmnptFsLXwrfuTL2FQl5NNAsHijYPnfEKL8_irzqNM'
const client = supabase.createClient(supabaseUrl, supabaseKey)

// Global variables for current form data
var currentForm = {
    title: '', // Form title
    description: '', // Form description
    color: '#6ee7ff' // Theme accent color
};

var formFields = []; // Array to store all form fields
var currentMode = 'build'; // Current app mode (build/fill/thanks)
var currentSlug = ''; // Current form slug for sharing
var currentFormId = ''; // Current form ID in database

// Initialize app when page loads
function startApp() {
    var urlParams = new URLSearchParams(window.location.search);
    
    // Check if URL has ?f= parameter to determine mode
    if (urlParams.has('f')) {
        currentMode = 'fill'; // Switch to fill mode
        currentSlug = urlParams.get('f'); // Get form slug
        showFillPage(); // Show form filling interface
    } else {
        currentMode = 'build'; // Default to build mode
        showBuildPage(); // Show form builder interface
    }
    
    loadDraftFromLocal(); // Load any saved draft from localStorage
}

// Show the form builder interface
function showBuildPage() {
    // Hide other modes and show build mode
    document.getElementById('modeFill').style.display = 'none';
    document.getElementById('modeThanks').style.display = 'none';
    document.getElementById('modeBuild').style.display = 'block';
    
    // Set current form values in inputs
    document.getElementById('formTitle').value = currentForm.title;
    document.getElementById('formDesc').value = currentForm.description;
    document.getElementById('accentColor').value = currentForm.color;
    
    changeAccentColor(currentForm.color); // Apply theme color
    setupButtons(); // Setup all button event listeners
    displayFields(); // Show existing fields
}

// Setup all button event listeners
function setupButtons() {
    // Form title input listener
    document.getElementById('formTitle').addEventListener('input', function() {
        currentForm.title = this.value; // Update form title
    });
    
    // Form description input listener
    document.getElementById('formDesc').addEventListener('input', function() {
        currentForm.description = this.value; // Update form description
    });
    
    // Accent color input listener
    document.getElementById('accentColor').addEventListener('input', function() {
        currentForm.color = this.value; // Update accent color
        changeAccentColor(this.value); // Apply new color
    });
    
    // Clear all fields button
    document.getElementById('btnClear').addEventListener('click', function() {
        if (confirm('Clear all fields?')) {
            formFields = []; // Empty fields array
            displayFields(); // Refresh display
            saveDraftToLocal(); // Save to localStorage
        }
    });
    
    // Save draft button
    document.getElementById('btnSaveDraft').addEventListener('click', function() {
        saveDraftToLocal(); // Save current state to localStorage
        showMessage('Draft saved!'); // Show success message
    });
    
    // Preview toggle button
    document.getElementById('btnPreviewToggle').addEventListener('click', function() {
        togglePreview(); // Toggle preview visibility
    });
    
    // Publish form button
    document.getElementById('btnPublish').addEventListener('click', function() {
        publishForm(); // Publish form to database
    });
    
    // Field type buttons - only 6 essential types
    var fieldButtons = document.querySelectorAll('.type-btn');
    for (var i = 0; i < fieldButtons.length; i++) {
        fieldButtons[i].addEventListener('click', function() {
            var fieldType = this.getAttribute('data-type'); // Get field type
            addNewField(fieldType); // Add new field of this type
        });
    }
}

// Change the accent color theme
function changeAccentColor(color) {
    document.documentElement.style.setProperty('--accent', color); // Update CSS variable
    var swatch = document.getElementById('accentSwatch');
    if (swatch) {
        swatch.style.background = color; // Update color swatch display
    }
}

// Add a new field to the form
function addNewField(fieldType) {
    var newField = {
        id: 'field_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5), // Unique ID
        type: fieldType, // Field type (short_text, email, etc.)
        label: getDefaultLabel(fieldType), // Default label for field type
        help: '', // Help text for field
        required: false, // Whether field is required
        options: getDefaultOptions(fieldType) // Options for radio/select fields
    };
    
    formFields.push(newField); // Add to fields array
    displayFields(); // Refresh display
    saveDraftToLocal(); // Save to localStorage
}

// Get default label for each field type - only 6 types supported
function getDefaultLabel(type) {
    var labels = {
        'short_text': 'Short Answer',
        'long_text': 'Long Answer', 
        'email': 'Email Address',
        'number': 'Number',
        'radio': 'Multiple Choice',
        'select': 'Dropdown'
    };
    return labels[type] || 'Question'; // Return label or default
}

// Get default options for choice fields
function getDefaultOptions(type) {
    if (type === 'radio' || type === 'select') {
        return ['Option 1', 'Option 2']; // Default options for choice fields
    }
    return []; // No options for other field types
}

// Display all fields in the builder
function displayFields() {
    var container = document.getElementById('fieldsRoot');
    container.innerHTML = ''; // Clear existing content
    
    if (formFields.length === 0) {
        container.innerHTML = '<div class="notice">Add fields from left sidebar</div>';
        return;
    }
    
    // Create field card for each field
    for (var i = 0; i < formFields.length; i++) {
        var fieldCard = createFieldCard(formFields[i], i);
        container.appendChild(fieldCard);
    }
}

// Create HTML card for a field
function createFieldCard(field, index) {
    var card = document.createElement('div');
    card.className = 'field-card';
    
    // Build field card HTML
    var cardHTML = '<div class="field-title">';
    cardHTML += '<span class="chip">' + field.type + '</span>'; // Field type chip
    cardHTML += '<div class="field-actions">';
    cardHTML += '<button class="btn small" onclick="moveFieldUp(' + index + ')">↑</button>'; // Move up button
    cardHTML += '<button class="btn small" onclick="moveFieldDown(' + index + ')">↓</button>'; // Move down button
    cardHTML += '<button class="btn small danger" onclick="deleteField(' + index + ')">Delete</button>'; // Delete button
    cardHTML += '</div></div>';
    
    // Label input
    cardHTML += '<div><label>Label</label>';
    cardHTML += '<input type="text" value="' + field.label + '" onchange="updateFieldLabel(' + index + ', this.value)"></div>';
    
    // Help text input
    cardHTML += '<div class="mt8"><label>Help Text</label>';
    cardHTML += '<input type="text" value="' + field.help + '" onchange="updateFieldHelp(' + index + ', this.value)"></div>';
    
    // Options textarea for radio and select fields only
    if (field.type === 'radio' || field.type === 'select') {
        cardHTML += '<div class="mt8"><label>Options (one per line)</label>';
        cardHTML += '<textarea onchange="updateFieldOptions(' + index + ', this.value)">' + field.options.join('\n') + '</textarea></div>';
    }
    
    // Required checkbox
    cardHTML += '<div class="row mt8"><label class="switch">';
    cardHTML += '<input type="checkbox" ' + (field.required ? 'checked' : '') + ' onchange="updateFieldRequired(' + index + ', this.checked)">';
    cardHTML += ' Required</label></div>';
    
    card.innerHTML = cardHTML;
    return card;
}

// Update field label
function updateFieldLabel(index, value) {
    formFields[index].label = value; // Update field label
    saveDraftToLocal(); // Save changes
}

// Update field help text
function updateFieldHelp(index, value) {
    formFields[index].help = value; // Update help text
    saveDraftToLocal(); // Save changes
}

// Update field options for radio/select
function updateFieldOptions(index, value) {
    var options = value.split('\n').filter(function(option) {
        return option.trim() !== ''; // Filter empty lines
    });
    formFields[index].options = options; // Update options array
    saveDraftToLocal(); // Save changes
}

// Update field required status
function updateFieldRequired(index, value) {
    formFields[index].required = value; // Update required status
    saveDraftToLocal(); // Save changes
}

// Move field up in order
function moveFieldUp(index) {
    if (index === 0) return; // Can't move first field up
    var temp = formFields[index];
    formFields[index] = formFields[index - 1];
    formFields[index - 1] = temp; // Swap fields
    displayFields(); // Refresh display
    saveDraftToLocal(); // Save changes
}

// Move field down in order
function moveFieldDown(index) {
    if (index === formFields.length - 1) return; // Can't move last field down
    var temp = formFields[index];
    formFields[index] = formFields[index + 1];
    formFields[index + 1] = temp; // Swap fields
    displayFields(); // Refresh display
    saveDraftToLocal(); // Save changes
}

// Delete a field
function deleteField(index) {
    if (confirm('Delete this field?')) {
        formFields.splice(index, 1); // Remove field from array
        displayFields(); // Refresh display
        saveDraftToLocal(); // Save changes
    }
}

// Toggle preview visibility
function togglePreview() {
    var previewDiv = document.getElementById('builderPreview');
    if (previewDiv.style.display === 'none' || previewDiv.style.display === '') {
        previewDiv.style.display = 'block';
        showPreview(); // Generate and show preview
    } else {
        previewDiv.style.display = 'none'; // Hide preview
    }
}

// Generate and show form preview - only 6 field types supported
function showPreview() {
    var previewHTML = '<div class="form-shell">';
    previewHTML += '<div class="form-head">';
    previewHTML += '<div style="font-size:20px; font-weight:800">' + (currentForm.title || 'Untitled Form') + '</div>';
    previewHTML += '<div class="muted">' + (currentForm.description || '') + '</div>';
    previewHTML += '</div><div class="form-body">';
    
    // Generate preview for each field
    for (var i = 0; i < formFields.length; i++) {
        var field = formFields[i];
        previewHTML += '<div class="mt12">';
        previewHTML += '<div><strong>' + field.label + '</strong>';
        if (field.required) previewHTML += ' <span class="req">*</span>'; // Required indicator
        previewHTML += '</div>';
        if (field.help) previewHTML += '<div class="muted">' + field.help + '</div>'; // Help text
        previewHTML += '<div class="mt8">';
        
        // Generate input based on field type - only 6 types
        if (field.type === 'short_text') {
            previewHTML += '<input type="text" placeholder="Your answer">';
        } else if (field.type === 'long_text') {
            previewHTML += '<textarea placeholder="Your answer"></textarea>';
        } else if (field.type === 'email') {
            previewHTML += '<input type="email" placeholder="email@example.com">';
        } else if (field.type === 'number') {
            previewHTML += '<input type="number" placeholder="123">';
        } else if (field.type === 'radio') {
            for (var j = 0; j < field.options.length; j++) {
                previewHTML += '<div class="row"><input type="radio" name="preview_' + field.id + '"> <span>' + field.options[j] + '</span></div>';
            }
        } else if (field.type === 'select') {
            previewHTML += '<select><option>Select...</option>';
            for (var k = 0; k < field.options.length; k++) {
                previewHTML += '<option>' + field.options[k] + '</option>';
            }
            previewHTML += '</select>';
        }
        
        previewHTML += '</div></div>';
    }
    
    previewHTML += '</div></div>';
    document.getElementById('builderPreview').innerHTML = previewHTML;
}

// Publish form to Supabase database
function publishForm() {
    // Validate form before publishing
    if (!currentForm.title) {
        showMessage('Please enter form title!');
        return;
    }
    
    if (formFields.length === 0) {
        showMessage('Please add at least one field!');
        return;
    }
    
    var formSlug = createSlug(currentForm.title); // Create unique slug
    
    // Prepare form data for database
    var formData = {
        title: currentForm.title,
        description: currentForm.description,
        accent: currentForm.color,
        is_published: true,
        slug: formSlug
    };
    
    // Save form to database
    client.from('forms').insert([formData]).select()
        .then(function(response) {
            if (response.error) {
                console.error('Form save error:', response.error);
                showMessage('Failed to publish form!');
                return;
            }
            
            var savedForm = response.data[0];
            
            // Prepare fields data for database
            var fieldsData = [];
            for (var i = 0; i < formFields.length; i++) {
                fieldsData.push({
                    form_id: savedForm.id,
                    type: formFields[i].type,
                    label: formFields[i].label,
                    help: formFields[i].help,
                    required: formFields[i].required,
                    order_index: i,
                    options: formFields[i].options
                });
            }
            
            // Save fields to database
            return client.from('fields').insert(fieldsData);
        })
        .then(function(fieldsResponse) {
            if (fieldsResponse && fieldsResponse.error) {
                console.error('Fields save error:', fieldsResponse.error);
                showMessage('Failed to save fields!');
                return;
            }
            
            // Success - show share link
            var shareLink = window.location.origin + window.location.pathname + '?f=' + formSlug;
            showMessage('Form published successfully!');
            
            // Copy link to clipboard if possible
            if (navigator.clipboard) {
                navigator.clipboard.writeText(shareLink);
            }
            
            // Show share link in preview area
            document.getElementById('builderPreview').style.display = 'block';
            document.getElementById('builderPreview').innerHTML = 
                '<div class="notice">Share link: <a href="' + shareLink + '" style="color:var(--accent)">' + shareLink + '</a></div>';
        })
        .catch(function(error) {
            console.error('Publish error:', error);
            showMessage('Failed to publish!');
        });
}

// Show form filling interface
function showFillPage() {
    // Hide other modes and show fill mode
    document.getElementById('modeBuild').style.display = 'none';
    document.getElementById('modeThanks').style.display = 'none';
    document.getElementById('modeFill').style.display = 'block';
    
    // Load form data from database using slug
    client.from('forms').select('*').eq('slug', currentSlug).eq('is_published', true).single()
        .then(function(response) {
            if (response.error || !response.data) {
                document.getElementById('fillTitle').textContent = 'Form not found';
                document.getElementById('fillDesc').textContent = 'Invalid link or unpublished form';
                return;
            }
            
            var formData = response.data;
            currentFormId = formData.id; // Store form ID for submission
            
            // Set form details in fill interface
            changeAccentColor(formData.accent || '#6ee7ff');
            document.getElementById('fillTitle').textContent = formData.title;
            document.getElementById('fillDesc').textContent = formData.description || '';
            
            // Load form fields
            return client.from('fields').select('*').eq('form_id', formData.id).order('order_index');
        })
        .then(function(fieldsResponse) {
            if (fieldsResponse && fieldsResponse.error) {
                console.error('Fields load error:', fieldsResponse.error);
                return;
            }
            
            var fields = fieldsResponse.data;
            createFillForm(fields); // Generate fillable form
        })
        .catch(function(error) {
            console.error('Fill mode error:', error);
            document.getElementById('fillTitle').textContent = 'Error loading form';
        });
}

// Create fillable form HTML - only 6 field types supported
function createFillForm(fields) {
    var formHTML = '';
    
    // Generate HTML for each field
    for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        formHTML += '<div class="mt12">';
        formHTML += '<label><strong>' + field.label + '</strong>';
        if (field.required) formHTML += ' <span class="req">*</span>'; // Required indicator
        formHTML += '</label>';
        if (field.help) formHTML += '<div class="muted">' + field.help + '</div>'; // Help text
        formHTML += '<div class="mt8">';
        
        // Generate input based on field type - only 6 types
        if (field.type === 'short_text') {
            formHTML += '<input name="' + field.id + '" type="text"' + (field.required ? ' required' : '') + '>';
        } else if (field.type === 'long_text') {
            formHTML += '<textarea name="' + field.id + '"' + (field.required ? ' required' : '') + '></textarea>';
        } else if (field.type === 'email') {
            formHTML += '<input name="' + field.id + '" type="email"' + (field.required ? ' required' : '') + '>';
        } else if (field.type === 'number') {
            formHTML += '<input name="' + field.id + '" type="number"' + (field.required ? ' required' : '') + '>';
        } else if (field.type === 'radio') {
            for (var j = 0; j < field.options.length; j++) {
                formHTML += '<div class="row">';
                formHTML += '<input type="radio" name="' + field.id + '" value="' + field.options[j] + '"' + (field.required ? ' required' : '') + '>';
                formHTML += ' <span>' + field.options[j] + '</span></div>';
            }
        } else if (field.type === 'select') {
            formHTML += '<select name="' + field.id + '"' + (field.required ? ' required' : '') + '>';
            formHTML += '<option value="">Select...</option>';
            for (var k = 0; k < field.options.length; k++) {
                formHTML += '<option value="' + field.options[k] + '">' + field.options[k] + '</option>';
            }
            formHTML += '</select>';
        }
        
        formHTML += '</div></div>';
    }
    
    formHTML += '<button type="submit" class="btn ok mt16">Submit</button>';
    document.getElementById('fillForm').innerHTML = formHTML;
    
    // Handle form submission
    document.getElementById('fillForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        submitForm(fields); // Custom form submission
    });
}

// Submit filled form to database
function submitForm(fields) {
    var formData = new FormData(document.getElementById('fillForm'));
    
    // Create response record in database
    client.from('responses').insert([{ form_id: currentFormId }]).select()
        .then(function(response) {
            if (response.error) {
                console.error('Response create error:', response.error);
                showMessage('Failed to submit!');
                return;
            }
            
            var responseData = response.data[0];
            var answers = [];
            
            // Collect answers for each field
            for (var i = 0; i < fields.length; i++) {
                var field = fields[i];
                var value = formData.get(field.id); // Get form value
                
                // Handle radio buttons (single value)
                if (field.type === 'radio') {
                    // Radio buttons already give single value
                }
                
                // Add answer if value exists
                if (value && value !== '') {
                    answers.push({
                        response_id: responseData.id,
                        field_id: field.id,
                        value: value
                    });
                }
            }
            
            // Save answers to database
            if (answers.length > 0) {
                return client.from('answers').insert(answers);
            }
        })
        .then(function(answersResponse) {
            if (answersResponse && answersResponse.error) {
                console.error('Answers save error:', answersResponse.error);
                showMessage('Failed to save answers!');
                return;
            }
            
            // Show thank you page
            document.getElementById('modeFill').style.display = 'none';
            document.getElementById('modeThanks').style.display = 'block';
            
            // Set "another response" link
            document.getElementById('btnAnother').href = window.location.href;
        })
        .catch(function(error) {
            console.error('Submit error:', error);
            showMessage('Failed to submit form!');
        });
}

// Helper function to create URL-friendly slug
function createSlug(title) {
    return title.toLowerCase() // Convert to lowercase
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with dashes
        .replace(/(^-|-$)/g, '') + // Remove leading/trailing dashes
        '-' + Date.now(); // Add timestamp for uniqueness
}

// Show toast message to user
function showMessage(message) {
    var toast = document.getElementById('toast');
    toast.textContent = message; // Set message text
    toast.style.display = 'block'; // Show toast
    setTimeout(function() {
        toast.style.display = 'none'; // Hide after 3 seconds
    }, 3000);
}

// Save current form state to localStorage
function saveDraftToLocal() {
    var draft = {
        form: currentForm, // Current form settings
        fields: formFields // Current form fields
    };
    localStorage.setItem('flexiforms_draft', JSON.stringify(draft)); // Save as JSON
}

// Load saved form state from localStorage
function loadDraftFromLocal() {
    try {
        var saved = localStorage.getItem('flexiforms_draft'); // Get saved data
        if (saved) {
            var draft = JSON.parse(saved); // Parse JSON
            currentForm = draft.form || currentForm; // Restore form settings
            formFields = draft.fields || []; // Restore form fields
        }
    } catch (error) {
        console.error('Draft load error:', error); // Log any errors
    }
}

// Start the application
startApp();