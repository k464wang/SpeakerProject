from msilib.schema import AppId
from winreg import REG_RESOURCE_LIST
from flask_cors import CORS, cross_origin
from flask import Flask, jsonify, render_template, request, send_file
from flask_restful import Resource, Api,reqparse
import mimetypes

app = Flask(__name__)
api = Api(app)

CORS(app)

@app.route('/')
def GiveSongs():
    return jsonify({'text' : 'song 1'})

class Songs(Resource):
   def get(self):
      return {'songs': [ {'name' : 'test'},{'name' : 'abcdexxxxx'} ]}
   
class PlaySongs(Resource):
   def get(self):
      parser = reqparse.RequestParser()
      filename = reqparse.request.args['file']
      print("-----------------------------------------------------------")
      print(filename)
      path_to_file = "C:\\Users\\kevin\\SpeakerProject\\songs\\" + filename + ".mp3"



      #parser.add_argument('start', type=str)
      #parser.add_argument('file', type=str)
      #args = parser.parse_args()
      #return {'song': [ {'name' : filename},{'start' : start} ]}

      return send_file(path_to_file,mimetype="audio.mp3",as_attachment=True,download_name=filename)

api.add_resource(Songs, '/songs')
api.add_resource(PlaySongs, '/playSongs')

if __name__ == '__main__':
   mimetypes.add_type('application/javascript', '.js', True)
   app.run(host="192.168.2.59", debug=True)
   