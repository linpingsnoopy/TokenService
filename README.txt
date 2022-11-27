1. How to run the service:
    npm start

2. Send the request example:
    curl -H "Content-Type: application/json" -X POST -d '["4444-4444-4444-4444"]' http://localhost:3000/tokenize
    curl -H "Content-Type: application/json" -X POST -d '["ASDFGWERTSXCVXCddd"]' http://localhost:3000/detokenize
    curl -H "Content-Type: application/json" -X GET http://localhost:3000/accounts
