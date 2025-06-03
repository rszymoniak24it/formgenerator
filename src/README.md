JSON Example: 

{
  "title": "Test Form",
  "fields": [
    { "name": "username", "label": "Username", "type": "string", "validation": { "required": true } },
    { "name": "age", "label": "Age", "type": "numeric", "validation": { "min": 18, "max": 99 } },
    { "name": "email", "label": "Email", "type": "string", "validation": { "pattern": "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$" } }
  ],
  "buttons": [{"label": "Submit", "action": "handleSubmit"}]
}
