# Validation test scenarios

1. Valid create (should return 201):
curl -X POST http://localhost:3000/admin/resources/create -H "Content-Type: application/json" -H "x-role: Admin" -d '{"name":"Panou X","description":"Descriere detaliata ...","category":"Energie","price":250,"referenceUrl":"http://example.com"}'

2. Invalid create (missing fields or wrong types -> 400):
curl -X POST http://localhost:3000/admin/resources/create -H "Content-Type: application/json" -H "x-role: Admin" -d '{"name":"Px","description":"short","category":"Unknown","price":-5}'

3. Conditional / optional (update with only one field):
curl -X PUT http://localhost:3000/admin/resources/update/1 -H "Content-Type: application/json" -H "x-role: Admin" -d '{"price": 600}'
