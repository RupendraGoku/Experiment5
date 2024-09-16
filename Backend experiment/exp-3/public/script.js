$(document).ready(function() {
    const studentsTableBody = $('#studentsTable tbody');

    // Function to load students from server
    const loadStudents = () => {
        $.get('/viewStudents', (students) => {
            studentsTableBody.empty();
            students.forEach(student => {
                studentsTableBody.append(`
                    <tr>
                        <td>${student.id}</td>
                        <td>${student.fname}</td>
                        <td>${student.lname}</td>
                    </tr>
                `);
            });
        });
    };

    // Load students on page load
    loadStudents();

    // Handle update form submission
    $('#updateForm').submit(function(event) {
        event.preventDefault();
        const id = $('#updateId').val();
        const fname = $('#updateFname').val();
        const lname = $('#updateLname').val();

        $.ajax({
            url: `/students/${id}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ fname, lname }),
            success: function(result) {
                alert('Student updated successfully');
                loadStudents();
            },
            error: function(err) {
                alert('Error updating student');
            }
        });
    });

    // Handle delete form submission
    $('#deleteForm').submit(function(event) {
        event.preventDefault();
        const id = $('#deleteId').val();

        $.ajax({
            url: `/students/${id}`,
            type: 'DELETE',
            success: function(result) {
                alert('Student deleted successfully');
                loadStudents();
            },
            error: function(err) {
                alert('Error deleting student');
            }
        });
    });
});
