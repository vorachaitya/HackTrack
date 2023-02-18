import streamlit as st
import pandas as pd
import base64,random
import time,datetime
from pyresparser import ResumeParser
from pdfminer3.layout import LAParams, LTTextBox
from pdfminer3.pdfpage import PDFPage
from pdfminer3.pdfinterp import PDFResourceManager
from pdfminer3.pdfinterp import PDFPageInterpreter
from pdfminer3.converter import TextConverter
import io,random
from streamlit_tags import st_tags
from PIL import Image
import pymysql
from Courses import ds_course,web_course,android_course,ios_course,uiux_course,resume_videos,interview_videos
# import pafy
import plotly.express as px
import smtplib
# Helper email modules 
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders

# sender email address
email_user = 'ppshah_b20@it.vjti.ac.in'
 
# sender email passowrd for login purposes
email_password = '@bhooklagihai7'

# import st_state_patch
s0 = st.session_state

def get_table_download_link(df,filename,text):
    """Generates a link allowing the data in a given panda dataframe to be downloaded
    in:  dataframe
    out: href string
    """
    csv = df.to_csv(index=False)
    b64 = base64.b64encode(csv.encode()).decode()  # some strings <-> bytes conversions necessary here
    # href = f'<a href="data:file/csv;base64,{b64}">Download Report</a>'
    href = f'<a href="data:file/csv;base64,{b64}" download="{filename}">{text}</a>'
    return href

def pdf_reader(file):
    resource_manager = PDFResourceManager()
    fake_file_handle = io.StringIO()
    converter = TextConverter(resource_manager, fake_file_handle, laparams=LAParams())
    page_interpreter = PDFPageInterpreter(resource_manager, converter)
    with open(file, 'rb') as fh:
        for page in PDFPage.get_pages(fh,
                                      caching=True,
                                      check_extractable=True):
            page_interpreter.process_page(page)
            # print(page)
        text = fake_file_handle.getvalue()

    # close open handles
    converter.close()
    fake_file_handle.close()
    return text

def show_pdf(file_path):
    with open(file_path, "rb") as f:
        base64_pdf = base64.b64encode(f.read()).decode('utf-8')
    # pdf_display = f'<embed src="data:application/pdf;base64,{base64_pdf}" width="700" height="1000" type="application/pdf">'
    pdf_display = F'<iframe src="data:application/pdf;base64,{base64_pdf}" width="700" height="1000" type="application/pdf"></iframe>'
    st.markdown(pdf_display, unsafe_allow_html=True)

def send_email(emails):
    emails = emails[0]
    subject = 'TEST EMAIL'
    msg = MIMEMultipart()
    msg['From'] = email_user
    # converting list of recipients into comma separated string
    msg['To'] = ", ".join(emails)
    msg['Subject'] = subject
    body = 'Congraluations!! You have been shorlisted for resume screening and been invited for quiz for selections.'
    msg.attach(MIMEText(body,'plain'))
    text = msg.as_string()
    server = smtplib.SMTP('smtp.gmail.com',587)
    server.starttls()
    server.login(email_user,email_password)
    server.sendmail(email_user,emails,text)
    server.quit()

def course_recommender(course_list):
    st.subheader("**Courses & Certificates🎓 Recommendations**")
    c = 0
    rec_course = []
    no_of_reco = st.slider('Choose Number of Course Recommendations:', 1, 10, 4)
    random.shuffle(course_list)
    for c_name, c_link in course_list:
        c += 1
        st.markdown(f"({c}) [{c_name}]({c_link})")
        rec_course.append(c_name)
        if c == no_of_reco:
            break
    return rec_course

def top_team(cursor):
    # st.subheader("**Yo**")
    # no_of_reco = st.slider('Choose Number of Course Recommendations:', 1, 10, 4)
    noTeams = st.slider('Enter the number of teams you need to shorlist', 1, 100, 10)
    print("teamsss: ", str(noTeams))
    cursor.execute('''SELECT DISTINCT(name),email,res_score,reco_field,skills FROM user_data ORDER BY res_score DESC LIMIT '''+ str(noTeams))
    data = cursor.fetchall()
    df1 = pd.DataFrame(data, columns=['Name', 'Email', 'Resume Score','Domain','Skill-set'])
    return df1

connection = pymysql.connect(host='localhost',user='root',password='',db='sra')
cursor = connection.cursor()

def insert_data(name,email,res_score,timestamp,no_of_pages,reco_field,cand_level,skills,recommended_skills,courses):
    DB_table_name = 'user_data'
    insert_sql = "insert into " + DB_table_name + """ values(0,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"""
    rec_values = (name, email, str(res_score), timestamp,str(no_of_pages), reco_field, cand_level, skills,recommended_skills,courses)
    cursor.execute(insert_sql, rec_values)
    connection.commit()

st.set_page_config(
   page_title="Smart Resume Analyzer",
#    page_icon='./Logo/SRA_Logo.ico',
)
# st.set_page_config(page_title='My App', page_icon=':smiley:', layout='wide', theme='dark')
def run():
    st.title("Hack Track")
    st.sidebar.markdown("# Choose User")
    activities = ["Normal User", "Admin"]
    choice = st.sidebar.selectbox("Choose among the given options:", activities)

    db_sql = """CREATE DATABASE IF NOT EXISTS SRA;"""
    cursor.execute(db_sql)

    # Create table
    DB_table_name = 'user_data'
    table_sql = "CREATE TABLE IF NOT EXISTS " + DB_table_name + """
                    (ID INT NOT NULL AUTO_INCREMENT,
                     Name varchar(100) NOT NULL,
                     Email_ID VARCHAR(50) NOT NULL,
                     resume_score VARCHAR(8) NOT NULL,
                     Timestamp VARCHAR(50) NOT NULL,
                     Page_no VARCHAR(5) NOT NULL,
                     Predicted_Field VARCHAR(25) NOT NULL,
                     User_level VARCHAR(30) NOT NULL,
                     Actual_skills VARCHAR(300) NOT NULL,
                     Recommended_skills VARCHAR(300) NOT NULL,
                     Recommended_courses VARCHAR(600) NOT NULL,
                     PRIMARY KEY (ID));
                    """
    cursor.execute(table_sql)
    if choice == 'Normal User':
        st.markdown('''<h4 style=''>* Upload your resume, and get score based on it. </h4>''',
                    unsafe_allow_html=True)
        
        pdf_file = st.file_uploader("Choose your Resume", type=["pdf"])
        if pdf_file is not None:
            save_image_path = './Uploaded_Resumes/'+pdf_file.name
            with open(save_image_path, "wb") as f:
                f.write(pdf_file.getbuffer())
            show_pdf(save_image_path)
            resume_data = ResumeParser(save_image_path).get_extracted_data()
            if resume_data:
                ## Get the whole resume data
                resume_text = pdf_reader(save_image_path)

                st.header("**Resume Analysis**")
                st.success("Hello "+ resume_data['name'])
                st.subheader("**Your Basic info**")
                try:
                    st.text('Name: '+resume_data['name'])
                    st.text('Email: ' + resume_data['email'])
                    st.text('Contact: ' + resume_data['mobile_number'])
                    st.text('Resume pages: '+str(resume_data['no_of_pages']))
                except:
                    pass
                resume_score = 0
                if 'gsoc' or 'google' in resume_text.lower():
                    resume_score = resume_score+15

                if 'experience' or 'work experience' or 'experience' or 'research' in resume_text.lower():
                    resume_score = resume_score + 25

                if 'achievement' or 'competition' or 'hackathon' in resume_text.lower():
                    resume_score = resume_score + 20
                
                if 'projects' in resume_text.lower():
                    resume_score = resume_score + 10
                
                
                st.subheader("**Resume Score**")
                
                st.markdown(
                    """
                    <style>
                        .stProgress > div > div > div > div {
                            background-color: #d73b5c;
                        }
                    </style>""",
                    unsafe_allow_html=True,
                )
                my_bar = st.progress(0)
                score = 0
                for percent_complete in range(resume_score):
                    score +=1
                    time.sleep(0.01)
                    my_bar.progress(percent_complete + 1)
                st.success('Your Resume Writing Score: ' + str(score))

                cand_level = ''
                if resume_data['no_of_pages'] == 1:
                    cand_level = "Fresher"
                    # st.markdown( '''<h4 style='text-align: left; color: #d73b5c;'>You are looking Fresher.</h4>''',unsafe_allow_html=True)
                elif resume_data['no_of_pages'] == 2:
                    cand_level = "Intermediate"
                    # st.markdown('''<h4 style='text-align: left; color: #1ed760;'>You are at intermediate level!</h4>''',unsafe_allow_html=True)
                elif resume_data['no_of_pages'] >=3:
                    cand_level = "Experienced"
                    # st.markdown('''<h4 style='text-align: left; color: #fba171;'>You are at experience level!''',unsafe_allow_html=True)

                st.subheader("**Skills Recommendation for your Domain**")
                ## Skill shows
                keywords = st_tags(label='### Skills that you have',
                text='See our skills recommendation',
                    value=resume_data['skills'],key = '1')

                ##  recommendation
                ds_keyword = ['tensorflow','keras','pytorch','machine learning','deep Learning','flask','streamlit']
                web_keyword = ['react', 'django', 'node jS', 'react js', 'php', 'laravel', 'magento', 'wordpress',
                               'javascript', 'angular js', 'c#', 'flask']
                android_keyword = ['android','android development','flutter','kotlin','xml','kivy']
                ios_keyword = ['ios','ios development','swift','cocoa','cocoa touch','xcode']
                uiux_keyword = ['ux','adobe xd','figma','zeplin','balsamiq','ui','prototyping','wireframes','storyframes','adobe photoshop','photoshop','editing','adobe illustrator','illustrator','adobe after effects','after effects','adobe premier pro','premier pro','adobe indesign','indesign','wireframe','solid','grasp','user research','user experience']

                recommended_skills = []
                reco_field = ''
                rec_course = ''
                ## Courses recommendation
                for i in resume_data['skills']:
                    ## Data science recommendation
                    if i.lower() in ds_keyword:
                        # print(i.lower())
                        reco_field = 'Data Science'
                        st.success("** Our analysis says you have good experience in Data Science.**")
                        recommended_skills = ['Data Visualization','Predictive Analysis','Statistical Modeling','Data Mining','Clustering & Classification','Data Analytics','Quantitative Analysis','Web Scraping','ML Algorithms','Keras','Pytorch','Probability','Scikit-learn','Tensorflow',"Flask",'Streamlit']
                        recommended_keywords = st_tags(label='### Recommended skills for you.',
                        text='Recommended skills generated from System',value=recommended_skills,key = '2')
                        st.markdown('''<h4 style='text-align: left; color: #1ed760;'>Adding this skills to resume will boost the chances of getting selected in this domain</h4>''',unsafe_allow_html=True)
                        rec_course = course_recommender(ds_course)
                        break

                    ## Web development recommendation
                    elif i.lower() in web_keyword:
                        # print(i.lower())
                        reco_field = 'Web Development'
                        st.success("** Our analysis says you have good experience in Web Development **")
                        recommended_skills = ['React','Django','Node JS','React JS','php','laravel','Magento','wordpress','Javascript','Angular JS','c#','Flask','SDK']
                        recommended_keywords = st_tags(label='### Recommended skills for you.',
                        text='Recommended skills generated from System',value=recommended_skills,key = '3')
                        st.markdown('''<h4 style='text-align: left; color: #1ed760;'>Adding this skills to resume will boost the chances of getting selected in this domain</h4>''',unsafe_allow_html=True)
                        rec_course = course_recommender(web_course)
                        break

                    ## Android App Development
                    elif i.lower() in android_keyword:
                        # print(i.lower())
                        reco_field = 'Android Development'
                        st.success("** Our analysis says you have good experience in Android App Development **")
                        recommended_skills = ['Android','Android development','Flutter','Kotlin','XML','Java','Kivy','GIT','SDK','SQLite']
                        recommended_keywords = st_tags(label='### Recommended skills for you.',
                        text='Recommended skills generated from System',value=recommended_skills,key = '4')
                        st.markdown('''<h4 style='text-align: left; color: #1ed760;'>Adding this skills to resume will boost the chances of getting selected in this domain</h4>''',unsafe_allow_html=True)
                        rec_course = course_recommender(android_course)
                        break

                    ## IOS App Development
                    elif i.lower() in ios_keyword:
                        # print(i.lower())
                        reco_field = 'IOS Development'
                        st.success("** Our analysis says you have good experience in IOS App Development **")
                        recommended_skills = ['IOS','IOS Development','Swift','Cocoa','Cocoa Touch','Xcode','Objective-C','SQLite','Plist','StoreKit',"UI-Kit",'AV Foundation','Auto-Layout']
                        recommended_keywords = st_tags(label='### Recommended skills for you.',
                        text='Recommended skills generated from System',value=recommended_skills,key = '5')
                        st.markdown('''<h4 style='text-align: left; color: #1ed760;'>Adding this skills to resume will boost the chances of getting selected in this domain</h4>''',unsafe_allow_html=True)
                        rec_course = course_recommender(ios_course)
                        break

                    ## Ui-UX Recommendation
                    elif i.lower() in uiux_keyword:
                        # print(i.lower())
                        reco_field = 'UI-UX Development'
                        st.success("** Our analysis says you have good experience in UI-UX Development **")
                        recommended_skills = ['UI','User Experience','Adobe XD','Figma','Zeplin','Balsamiq','Prototyping','Wireframes','Storyframes','Adobe Photoshop','Editing','Illustrator','After Effects','Premier Pro','Indesign','Wireframe','Solid','Grasp','User Research']
                        recommended_keywords = st_tags(label='### Recommended skills for you.',
                        text='Recommended skills generated from System',value=recommended_skills,key = '6')
                        st.markdown('''<h4 style='text-align: left; color: #1ed760;'>Adding this skills to resume will boost the chances of getting selected in this domain</h4>''',unsafe_allow_html=True)
                        rec_course = course_recommender(uiux_course)
                        break

                
                ## Insert into table
                ts = time.time()
                cur_date = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d')
                cur_time = datetime.datetime.fromtimestamp(ts).strftime('%H:%M:%S')
                timestamp = str(cur_date+'_'+cur_time)

                
                insert_data(resume_data['name'], resume_data['email'], str(resume_score), timestamp,
                              str(resume_data['no_of_pages']), reco_field, cand_level, str(resume_data['skills']),
                              str(recommended_skills), str(rec_course))


                connection.commit()
            else:
                st.error('Something went wrong..')
    else:
        ## Admin Side
        # global noTeams, flag
        st.success('Welcome to Admin Side')
        ad_user = st.text_input("Username")
        ad_password = st.text_input("Password", type='password')
        # s.pressed_first_button = True
        if st.button('Login'):
            if (ad_user == '11' and ad_password == '11'):
                # st.success("Welcome ")
                
                df1 = top_team(cursor)
                
                last_same_score = df1.iloc[-1]["Resume Score"]
                # print("yoo: ", last_same_score)

                # Display All Data
                cursor.execute('''SELECT name,email,res_score,reco_field,skills FROM user_data''')
                data = cursor.fetchall()
                df = pd.DataFrame(data, columns=['Name', 'Email', 'Resume-Score','Domain','Skill-set'])

                ## Admin Side Data
                query = 'select * from user_data;'
                plot_data = pd.read_sql(query, connection)

                # # Pie chart for predicted field recommendations
                labels = plot_data["reco_field"].unique()
                values = plot_data["reco_field"].value_counts()
                st.subheader(" **Pie-Chart for User Profile Domain**")
                fig = px.pie(df, values=values, names=labels, title='Domain according to the Skills')
                st.plotly_chart(fig)

                # ### Pie chart for User's👨‍💻 Experienced Level
                # labels = plot_data["cand_level"].unique()
                # values = plot_data["cand_level"].value_counts()
                # st.subheader(" ** Pie-Chart for User's Experienced Level**")
                # fig = px.pie(df, values=values, names=labels, title="Pie-Chart for User's Experienced Level")
                # st.plotly_chart(fig)

                ### Pie chart for User's👨‍💻 Experienced Level
                labels = plot_data["res_score"]
                values = plot_data["res_score"].value_counts()
                st.subheader(" ** Bar chart for User's Experienced Level**")
                fig = px.histogram(df, x=labels, nbins = 5, title="User's Resume-Score")
                st.plotly_chart(fig)

                st.header("**Top 10 team's data**")   
                st.dataframe(df1)
                # st.header("**User's Data**")
                # st.dataframe(df)

                cursor.execute('''SELECT distinct(email) FROM user_data where res_score =''' + str(last_same_score))
                data = cursor.fetchall()
                df2 = pd.DataFrame(data, columns=['Email'])
                emails = df2["Email"].tolist()
                print(emails)

                if len(emails) > 0:
                    st.header("**Sending test link via email for quiz with same score**")
                    st.dataframe(df2)
                    st.button("Send Mail", on_click=send_email, args=[emails])

                st.markdown(get_table_download_link(df,'User_Data.csv','Download Report'), unsafe_allow_html=True)

            else:
                st.error("Wrong ID & Password Provided")

# noTeams = 4
run()