// lista
export function list(req,res)
{
    return res.json([
                      {name:"Juan",id:"01"},
                      {name:"Carlos",id:"02"},
                      {name:"Luisa",id:"03"},
                      {name:"Marcela",id:"04"}
                      ]);
}
// id
export function show(req, res) {
  return res.json(req.params.id);
}

// agregar 
export function add(req, res) {
  return res.json({usuario:req.body});
}