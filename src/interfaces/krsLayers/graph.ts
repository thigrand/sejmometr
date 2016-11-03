interface KrsLayersGraphNodeData {
  data_urodzenia: string;
  imiona: string;
  nazwisko: string;
  plec: string;
  privacy_level: string;
}

interface KrsLayersGraphNode {
  data: KrsLayersGraphNodeData;
  id: string;
  label: string;
  mp_id: string;
}

interface KrsLayersGraphRelationship {
  end: string;
  start: string;
  type: string;
}

export interface KrsLayerGraph {
  nodes: Array<KrsLayersGraphNode>;
  relationoships: Array<KrsLayersGraphRelationship>;
  root: string;
}
