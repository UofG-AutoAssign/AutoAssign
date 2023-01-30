# Placeholder text

Members  
Naral Chalermchaikosol - 2783720c@student.gla.ac.uk  
Max Wang - 2561238w@student.gla.ac.uk  
Vaughn Muirhead - 2575235m@student.gla.ac.uk  
Binhao Li - 2534558l@student.gla.ac.uk  
Prith Manickam - 2518533m@student.gla.ac.uk  
Hugo Findlay - 2554911f@student.gla.ac.uk  

Team Coach  
Tim Storer - Timothy.Storer@glasgow.ac.uk

# Main



## Project
Automated Allocation for Grad Programme 


## Links
ER Diagram: https://gla-my.sharepoint.com/:u:/g/personal/2575235m_student_gla_ac_uk/EYP84zhmkexCrAAsUlQMdy8BEKsUjhI-rGA96Qrc9Q0Yzg?e=GZfZoZ
Figma (Wireframes): https://www.figma.com/file/AH6i7Z9b0IayMIizR5B4XR/Final-Frontend-Prototype?node-id=0%3A1


## Description

A set of automated distribution systems for Barclays has been provided to help Barclays distribute employees to suitable jobs.


## Badges

On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.


## Visuals

Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Installation
A full list of dependancies can be seen in [requirements.txt](AutoAssign/requirements.txt)

### Automated
1) Run [install.py](AutoAssign/install.py) found inside [AutoAssign](AutoAssign/)

### Manual
1) First install all dependancies using: ``` pip install -r requirements.txt``` inside [AutoAssign](AutoAssign/)

#### Django
2) Create the database by running the following commands inside [AutoAssign](AutoAssign/):  
- ``` python3 manage.py makemigrations ```  
- ``` python3 manage.py migrate ```

#### React
3) Setup React react using: ``` npm install``` inside [client](client/)


## Usage
### Automated
1) Run [startup.py](AutoAssign/startup.py) found inside [AutoAssign](AutoAssign/)

### Manual
1) Start the backend server with: ``` python3 manage.py runserver``` inside [AutoAssign](AutoAssign/)

2) Then, start the fronted server with: ``` npm run dev``` inside [client](client/)

3) Finally, open the URL provided by the frontend server, usually [http://localhost:5173](http://localhost:5173)

## Support

Members

Naral Chalermchaikosol - 2783720c@student.gla.ac.uk

Max Wang - 2561238w@student.gla.ac.uk

Vaughn Muirhead - 2575235m@student.gla.ac.uk

Binhao Li - 2534558l@student.gla.ac.uk

Prith Manickam - 2518533m@student.gla.ac.uk

Hugo Findlay - 2554911f@student.gla.ac.uk

Team Coach

Tim Storer - Timothy.Storer@glasgow.ac.uk


## Roadmap

If you have ideas for releases in the future, it is a good idea to list them in the README.

## Contributing

State if you are open to contributions and what your requirements are for accepting them.
For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.
You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.


## Authors and acknowledgment

Show your appreciation to those who have contributed to the project.


## License

For open source projects, say how it is licensed.


## Project status

If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.

