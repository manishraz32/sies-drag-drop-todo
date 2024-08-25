
function createTaskElement(task) {
    return `
        <div class="task" draggable="true" id="${task.id}">
            <div class="task-header-container" ondragstart="event.preventDefault()">
                <p class="task-header">${task.taskName}</p>
                <div class="img-container" ondragstart="event.preventDefault()">
                    <img id="open-svg" src="asset/exit.svg" alt="">
                </div>
            </div>
            <div class="date-container" ondragstart="event.preventDefault()">
                <div class="img-container" ondragstart="event.preventDefault()">
                    <img src="asset/calender.svg" alt="">
                </div>
                <div class="date-text" ondragstart="event.preventDefault()">
                    <p>${task.date}</p>
                </div>
            </div>
        </div>
    `;
}
const greenSvg = 'asset/green.svg';
const redSvg = 'asset/red-open.svg';

$(document).ready(function() {
    let draggedTask = null;
    const tasks = [
        { id: 'task1', taskName: 'Sidebar not working', status: 'todo', date: '28 / 04 / 2023, 1:03pm' },
        { id: 'task2', taskName: 'Course search error', status: 'todo', date: '15 / 04 / 2024, 2:42pm' },
        { id: 'task3', taskName: 'Responsive issue', status: 'in-progress', date: '29 / 04 / 2023, 12:09pm' },
        { id: 'task4', taskName: 'Undergraduate courses in Malasia', status: 'completed', date: '15 / 04 / 2024, 2:42pm' },
    ];

    tasks.forEach(task => {
        const taskHtml = createTaskElement(task);
        const $taskElement = $(taskHtml);
        if (task.status === 'todo') {
            $taskElement.find('#open-svg').attr('src', redSvg);
            $('.section#todo').append($taskElement);
        } else if (task.status === 'in-progress') {
            $taskElement.find('#open-svg').attr('src', redSvg);
            $('.section#in-progress').append($taskElement);
        } else if (task.status === 'completed') {
            $taskElement.css('background-color', "#d1edc6");
            $taskElement.find('.task-header').css('color', "#38761D");
            $taskElement.find('#open-svg').attr('src', greenSvg);
            $('.section#completed').append($taskElement);
        }
    });

    $('.task').on('dragstart', function(event) {
        draggedTask = event.target;
        $(event.target).addClass('dragging');
    });

    $('.task').on('dragend', function(event) {
        $(event.target).removeClass('dragging');
        draggedTask = null;
    });

    $('.section').on('dragover', function(event) {
        event.preventDefault();
    });

    $('.section').on('dragenter', function(event) {
        event.preventDefault();
        $(this).addClass('hovered');
    });

    $('.section').on('dragleave', function(event) {
        $(this).removeClass('hovered');
    });

    $('.section').on('drop', function(event) {
        event.preventDefault();
        $(this).removeClass('hovered');
    
        if (draggedTask) {
            const newStatus = $(this).attr('id');
            const taskId = $(draggedTask).attr('id');
    
            tasks.forEach(task => {
                if (task.id === taskId) {
                    task.status = newStatus;
                }
            });
            // Apply styles based on the new status
            if (newStatus === 'completed') {
                $(draggedTask).css('background-color', "#d1edc6");
                $(draggedTask).find('.task-header').css('color', "#38761D");
                $(draggedTask).find('#open-svg').attr('src', greenSvg);
            } else {
                $(draggedTask).css('background-color', "#FED4CA");
                $(draggedTask).find('.task-header').css('color', "#D40000");
                $(draggedTask).find('#open-svg').attr('src', redSvg);
            }
            $(this).append(draggedTask);
        }
    });
});
