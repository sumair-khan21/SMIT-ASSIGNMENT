const supabaseUrl = 'https://kerazyzofdhkkypiwpzw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlcmF6eXpvZmRoa2t5cGl3cHp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxMjAwMTMsImV4cCI6MjA2ODY5NjAxM30.aCmnptFsLXwrfuTL2FQl5NNAsHijYPnfEKL8_irzqNM'
const client = supabase.createClient(supabaseUrl, supabaseKey)

var currentForm = {
    title: '', 
    description: '', 
    color: '#6ee7ff' 
};

var formFields = []; 
var currentMode = 'build'; 
var currentSlug = ''; 
var currentFormId = ''; 

function startApp() {
    var urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.has('f')) {
        currentMode = 'fill'; 
        currentSlug = urlParams.get('f'); 
        showFillPage(); 
    } else {
        currentMode = 'build';
        showBuildPage();
    }
    
    loadDraftFromLocal(); 
}

function showBuildPage() {
    document.getElementById('modeFill').style.display = 'none';
    document.getElementById('modeThanks').style.display = 'none';
    document.getElementById('modeBuild').style.display = 'block';
    
    document.getElementById('formTitle').value = currentForm.title;
    document.getElementById('formDesc').value = currentForm.description;
    document.getElementById('accentColor').value = currentForm.color;
    
    changeAccentColor(currentForm.color); 
    setupButtons(); 
    displayFields();
}
function setupButtons() {
    document.getElementById('formTitle').addEventListener('input', function() {
        currentForm.title = this.value; 
    });
    
    document.getElementById('formDesc').addEventListener('input', function() {
        currentForm.description = this.value; 
    });
    
    
    document.getElementById('accentColor').addEventListener('input', function() {
        currentForm.color = this.value; 
        changeAccentColor(this.value); 
    });
    
    
    document.getElementById('btnClear').addEventListener('click', function() {
        if (confirm('Clear all fields?')) {
            formFields = []; 
            displayFields(); 
            saveDraftToLocal(); 
        }
    });
    
    
    document.getElementById('btnSaveDraft').addEventListener('click', function() {
        saveDraftToLocal(); 
        showMessage('Draft saved!'); 
    });
    
    
    document.getElementById('btnPreviewToggle').addEventListener('click', function() {
        togglePreview(); 
    });
    
    
    document.getElementById('btnPublish').addEventListener('click', function() {
        publishForm(); 
    });
    
    
    var fieldButtons = document.querySelectorAll('.type-btn');
    for (var i = 0; i < fieldButtons.length; i++) {
        fieldButtons[i].addEventListener('click', function() {
            var fieldType = this.getAttribute('data-type'); 
            addNewField(fieldType); 
        });
    }
}


function changeAccentColor(color) {
    document.documentElement.style.setProperty('--accent', color); 
    var swatch = document.getElementById('accentSwatch');
    if (swatch) {
        swatch.style.background = color; 
    }
}


function addNewField(fieldType) {
    var newField = {
        id: 'field_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5), 
        type: fieldType, 
        label: getDefaultLabel(fieldType), 
        help: '', 
        required: false, 
        options: getDefaultOptions(fieldType) 
    };
    
    formFields.push(newField); 
    displayFields(); 
    saveDraftToLocal(); 
}


function getDefaultLabel(type) {
    var labels = {
        'short_text': 'Short Answer',
        'long_text': 'Long Answer', 
        'email': 'Email Address',
        'number': 'Number',
        'radio': 'Multiple Choice',
        'select': 'Dropdown'
    };
    return labels[type] || 'Question'; 
}


function getDefaultOptions(type) {
    if (type === 'radio' || type === 'select') {
        return ['Option 1', 'Option 2']; 
    }
    return []; 
}


function displayFields() {
    var container = document.getElementById('fieldsRoot');
    container.innerHTML = ''; 
    
    if (formFields.length === 0) {
        container.innerHTML = '<div class="notice">Add fields from left sidebar</div>';
        return;
    }
    
    
    for (var i = 0; i < formFields.length; i++) {
        var fieldCard = createFieldCard(formFields[i], i);
        container.appendChild(fieldCard);
    }
}


function createFieldCard(field, index) {
    var card = document.createElement('div');
    card.className = 'field-card';
    
    
    var cardHTML = '<div class="field-title">';
    cardHTML += '<span class="chip">' + field.type + '</span>'; 
    cardHTML += '<div class="field-actions">';
    cardHTML += '<button class="btn small" onclick="moveFieldUp(' + index + ')">↑</button>'; 
    cardHTML += '<button class="btn small" onclick="moveFieldDown(' + index + ')">↓</button>'; 
    cardHTML += '<button class="btn small danger" onclick="deleteField(' + index + ')">Delete</button>'; 
    cardHTML += '</div></div>';
    
    
    cardHTML += '<div><label>Label</label>';
    cardHTML += '<input type="text" value="' + field.label + '" onchange="updateFieldLabel(' + index + ', this.value)"></div>';
    
    
    cardHTML += '<div class="mt8"><label>Help Text</label>';
    cardHTML += '<input type="text" value="' + field.help + '" onchange="updateFieldHelp(' + index + ', this.value)"></div>';
    
    
    if (field.type === 'radio' || field.type === 'select') {
        cardHTML += '<div class="mt8"><label>Options (one per line)</label>';
        cardHTML += '<textarea onchange="updateFieldOptions(' + index + ', this.value)">' + field.options.join('\n') + '</textarea></div>';
    }
    
    
    cardHTML += '<div class="row mt8"><label class="switch">';
    cardHTML += '<input type="checkbox" ' + (field.required ? 'checked' : '') + ' onchange="updateFieldRequired(' + index + ', this.checked)">';
    cardHTML += ' Required</label></div>';
    
    card.innerHTML = cardHTML;
    return card;
}


function updateFieldLabel(index, value) {
    formFields[index].label = value; 
    saveDraftToLocal(); 
}


function updateFieldHelp(index, value) {
    formFields[index].help = value; 
    saveDraftToLocal(); 
}


function updateFieldOptions(index, value) {
    var options = value.split('\n').filter(function(option) {
        return option.trim() !== ''; 
    });
    formFields[index].options = options; 
    saveDraftToLocal(); 
}


function updateFieldRequired(index, value) {
    formFields[index].required = value; 
    saveDraftToLocal(); 
}


function moveFieldUp(index) {
    if (index === 0) return; 
    var temp = formFields[index];
    formFields[index] = formFields[index - 1];
    formFields[index - 1] = temp; 
    displayFields(); 
    saveDraftToLocal(); 
}


function moveFieldDown(index) {
    if (index === formFields.length - 1) return; 
    var temp = formFields[index];
    formFields[index] = formFields[index + 1];
    formFields[index + 1] = temp; 
    displayFields(); 
    saveDraftToLocal(); 
}


function deleteField(index) {
    if (confirm('Delete this field?')) {
        formFields.splice(index, 1); 
        displayFields(); 
        saveDraftToLocal(); 
    }
}


function togglePreview() {
    var previewDiv = document.getElementById('builderPreview');
    if (previewDiv.style.display === 'none' || previewDiv.style.display === '') {
        previewDiv.style.display = 'block';
        showPreview(); 
    } else {
        previewDiv.style.display = 'none'; 
    }
}


function showPreview() {
    var previewHTML = '<div class="form-shell">';
    previewHTML += '<div class="form-head">';
    previewHTML += '<div style="font-size:20px; font-weight:800">' + (currentForm.title || 'Untitled Form') + '</div>';
    previewHTML += '<div class="muted">' + (currentForm.description || '') + '</div>';
    previewHTML += '</div><div class="form-body">';
    
    
    for (var i = 0; i < formFields.length; i++) {
        var field = formFields[i];
        previewHTML += '<div class="mt12">';
        previewHTML += '<div><strong>' + field.label + '</strong>';
        if (field.required) previewHTML += ' <span class="req">*</span>'; 
        previewHTML += '</div>';
        if (field.help) previewHTML += '<div class="muted">' + field.help + '</div>'; 
        previewHTML += '<div class="mt8">';
        
        
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


function publishForm() {
    
    if (!currentForm.title) {
        showMessage('Please enter form title!');
        return;
    }
    
    if (formFields.length === 0) {
        showMessage('Please add at least one field!');
        return;
    }
    
    var formSlug = createSlug(currentForm.title); 
    
    
    var formData = {
        title: currentForm.title,
        description: currentForm.description,
        accent: currentForm.color,
        is_published: true,
        slug: formSlug
    };
    
    
    client.from('forms').insert([formData]).select()
        .then(function(response) {
            if (response.error) {
                console.error('Form save error:', response.error);
                showMessage('Failed to publish form!');
                return;
            }
            
            var savedForm = response.data[0];
            
            
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
            
            
            return client.from('fields').insert(fieldsData);
        })
        .then(function(fieldsResponse) {
            if (fieldsResponse && fieldsResponse.error) {
                console.error('Fields save error:', fieldsResponse.error);
                showMessage('Failed to save fields!');
                return;
            }
            
            
            var shareLink = window.location.origin + window.location.pathname + '?f=' + formSlug;
            showMessage('Form published successfully!');
            
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(shareLink);
            }
            
            
            document.getElementById('builderPreview').style.display = 'block';
            document.getElementById('builderPreview').innerHTML = 
                '<div class="notice">Share link: <a href="' + shareLink + '" style="color:var(--accent)">' + shareLink + '</a></div>';
        })
        .catch(function(error) {
            console.error('Publish error:', error);
            showMessage('Failed to publish!');
        });
}


function showFillPage() {
    
    document.getElementById('modeBuild').style.display = 'none';
    document.getElementById('modeThanks').style.display = 'none';
    document.getElementById('modeFill').style.display = 'block';
    
    
    client.from('forms').select('*').eq('slug', currentSlug).eq('is_published', true).single()
        .then(function(response) {
            if (response.error || !response.data) {
                document.getElementById('fillTitle').textContent = 'Form not found';
                document.getElementById('fillDesc').textContent = 'Invalid link or unpublished form';
                return;
            }
            
            var formData = response.data;
            currentFormId = formData.id; 
            
            
            changeAccentColor(formData.accent || '#6ee7ff');
            document.getElementById('fillTitle').textContent = formData.title;
            document.getElementById('fillDesc').textContent = formData.description || '';
            
            
            return client.from('fields').select('*').eq('form_id', formData.id).order('order_index');
        })
        .then(function(fieldsResponse) {
            if (fieldsResponse && fieldsResponse.error) {
                console.error('Fields load error:', fieldsResponse.error);
                return;
            }
            
            var fields = fieldsResponse.data;
            createFillForm(fields); 
        })
        .catch(function(error) {
            console.error('Fill mode error:', error);
            document.getElementById('fillTitle').textContent = 'Error loading form';
        });
}


function createFillForm(fields) {
    var formHTML = '';
    
    
    for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        formHTML += '<div class="mt12">';
        formHTML += '<label><strong>' + field.label + '</strong>';
        if (field.required) formHTML += ' <span class="req">*</span>'; 
        formHTML += '</label>';
        if (field.help) formHTML += '<div class="muted">' + field.help + '</div>'; 
        formHTML += '<div class="mt8">';
        
        
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
    
    
    document.getElementById('fillForm').addEventListener('submit', function(e) {
        e.preventDefault(); 
        submitForm(fields); 
    });
}


function submitForm(fields) {
    var formData = new FormData(document.getElementById('fillForm'));
    
    
    client.from('responses').insert([{ form_id: currentFormId }]).select()
        .then(function(response) {
            if (response.error) {
                console.error('Response create error:', response.error);
                showMessage('Failed to submit!');
                return;
            }
            
            var responseData = response.data[0];
            var answers = [];
            
            
            for (var i = 0; i < fields.length; i++) {
                var field = fields[i];
                var value = formData.get(field.id); 
                
                
                if (field.type === 'radio') {
                    
                }
                
                
                if (value && value !== '') {
                    answers.push({
                        response_id: responseData.id,
                        field_id: field.id,
                        value: value
                    });
                }
            }
            
            
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
            
            
            document.getElementById('modeFill').style.display = 'none';
            document.getElementById('modeThanks').style.display = 'block';
            
            
            document.getElementById('btnAnother').href = window.location.href;
        })
        .catch(function(error) {
            console.error('Submit error:', error);
            showMessage('Failed to submit form!');
        });
}


function createSlug(title) {
    return title.toLowerCase() 
        .replace(/[^a-z0-9]+/g, '-') 
        .replace(/(^-|-$)/g, '') + 
        '-' + Date.now(); 
}


function showMessage(message) {
    var toast = document.getElementById('toast');
    toast.textContent = message; 
    toast.style.display = 'block'; 
    setTimeout(function() {
        toast.style.display = 'none'; 
    }, 3000);
}


function saveDraftToLocal() {
    var draft = {
        form: currentForm, 
        fields: formFields 
    };
    localStorage.setItem('flexiforms_draft', JSON.stringify(draft)); 
}


function loadDraftFromLocal() {
    try {
        var saved = localStorage.getItem('flexiforms_draft'); 
        if (saved) {
            var draft = JSON.parse(saved); 
            currentForm = draft.form || currentForm; 
            formFields = draft.fields || []; 
        }
    } catch (error) {
        console.error('Draft load error:', error); 
    }
}


startApp();