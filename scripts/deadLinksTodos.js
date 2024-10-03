const fs = require('fs');

// Read the input JSON from dead_links.json file
fs.readFile('dead_links.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    // Parse the JSON data
    let input;
    try {
        input = JSON.parse(data);
    } catch (parseErr) {
        console.error('Error parsing JSON:', parseErr);
        return;
    }

    // Group todos by category
    const categories = {};

    // Iterate over each item to classify them by category
    input.forEach(item => {
        const categoryMatch = item.file.match(/\.\/content\/(\w+)\//);
        let category = categoryMatch ? categoryMatch[1] : 'other';

        if (!categories[category]) {
            categories[category] = [];
        }

        // Add the todo to the corresponding category
        categories[category].push(`- [ ] [${item.status_code}] ${item.link} in ${item.file}`);
    });

    // Create the output text
    let output = '';

    Object.keys(categories).forEach(category => {
        output += `## ${category}\n\n`;
        output += categories[category].join('\n') + '\n\n';
    });

    // Write output to a text file
    fs.writeFile('todos.md', output, writeErr => {
        if (writeErr) {
            console.error('Error writing the file:', writeErr);
            return;
        }

        console.log('Todos have been successfully written to todos.md');
    });

    // Output the result in the console as well
    console.log(output);
});